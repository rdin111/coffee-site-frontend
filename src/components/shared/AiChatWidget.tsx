import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/features/cart/cartSlice';
import { fetchProducts } from '@/api/products';
import toast from 'react-hot-toast';

interface Message {
    role: 'user' | 'model';
    parts: { text?: string; functionCall?: any; functionResponse?: any }[];
}

export function AiChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', parts: [{ text: "Welcome to The Grind! I'm your personal coffee sommelier. I can recommend the perfect roast based on your taste, or help you add items directly to your cart. What are you looking for today?" }] }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<any[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch products so AI knows exactly what we sell
        fetchProducts({ page: 0, size: 100 })
            .then(res => setProducts(res.content))
            .catch(console.error);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    const handleSend = async (text: string = input) => {
        if (!text.trim()) return;
        
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            toast.error("Please add VITE_GEMINI_API_KEY to your frontend .env file!");
            return;
        }

        const newUserMsg: Message = { role: 'user', parts: [{ text }] };
        const newHistory = [...messages, newUserMsg];
        setMessages(newHistory);
        setInput('');
        setIsLoading(true);

        try {
            await processGeminiCall(newHistory, apiKey);
        } catch (error) {
            console.error(error);
            toast.error("AI connection error. Check console.");
        } finally {
            setIsLoading(false);
        }
    };

    const processGeminiCall = async (history: Message[], apiKey: string) => {
        // Build a catalog string so the AI knows exact IDs and prices
        const catalog = products.map(p => `ID: ${p.id}, Name: ${p.name}, Price: $${p.price}, Roast: ${p.roastLevel}, Description: ${p.description}`).join('\n');
        
        const payload = {
            systemInstruction: { 
                parts: [{ 
                    text: `You are an expert coffee barista and sommelier for "The Grind" artisan coffee roasters. 
Your goal is to proactively help customers find the perfect coffee, educate them on flavor profiles, and assist with purchases. Keep responses conversational and concise.

CRITICAL RULES:
1. ALWAYS stay on topic. You ONLY discuss coffee, brewing methods, and products from The Grind. Politely decline unrelated topics.
2. Be proactive! Ask follow-up questions to narrow down their taste. If suggesting a coffee, briefly explain WHY it matches their taste.
3. NEVER show or mention the product "ID" to the user. The ID is strictly for your internal use when calling tools. Instead of "Brazilian Bourbon (ID: 27)", just say "Brazilian Bourbon".
4. When a user explicitly asks to buy something or add it to their cart, YOU MUST USE the add_to_cart tool immediately. Do not ask them to do it themselves.

Here is our current product catalog:
${catalog}` 
                }] 
            },
            contents: history,
            tools: [{
                functionDeclarations: [{
                    name: "add_to_cart",
                    description: "Adds a specific coffee product to the user's shopping cart.",
                    parameters: {
                        type: "OBJECT",
                        properties: {
                            productId: { type: "INTEGER", description: "The numeric ID of the coffee product" },
                            quantity: { type: "INTEGER", description: "The number of items to add" }
                        },
                        required: ["productId", "quantity"]
                    }
                }]
            }]
        };

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const data = await res.json();
        if (!data.candidates || data.candidates.length === 0) return;
        
        const responseMsg = data.candidates[0].content;
        setMessages(prev => [...prev, responseMsg]);

        // Check if the AI decided to call our add_to_cart tool
        const toolCallPart = responseMsg.parts.find((p: any) => p.functionCall);
        if (toolCallPart && toolCallPart.functionCall.name === 'add_to_cart') {
            const { productId, quantity } = toolCallPart.functionCall.args;
            const product = products.find(p => p.id === productId);
            
            if (product) {
                // Execute the frontend Redux action!
                dispatch(addToCart({ product, quantity: quantity || 1 }));
                toast.success(`AI Barista added ${quantity || 1}x ${product.name} to your cart!`, { icon: '☕' });
                
                // Send the success response back to the AI so it knows it worked
                const funcResponseMsg: Message = {
                    role: 'user',
                    parts: [{
                        functionResponse: {
                            name: 'add_to_cart',
                            response: { success: true, message: `Successfully added ${product.name} to cart.` }
                        }
                    }]
                };
                setMessages(prev => [...prev, funcResponseMsg]);
                // Ask the AI to generate a final text response (like "I've added that for you!")
                await processGeminiCall([...history, responseMsg, funcResponseMsg], apiKey);
            }
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button 
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 p-4 bg-[var(--color-primary)] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50 ${isOpen ? 'opacity-0 pointer-events-none scale-50' : 'opacity-100 scale-100'}`}
            >
                <MessageCircle className="h-6 w-6" />
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-3rem)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right z-50 ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'}`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)] rounded-t-2xl">
                    <div className="flex items-center gap-2">
                        <div className="bg-[var(--color-primary)] p-1.5 rounded-lg">
                            <Bot className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-serif font-semibold text-[var(--color-text-primary)]">AI Barista</span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Only render text parts, ignore invisible function calls */}
                    {messages.map((msg, i) => {
                        const textPart = msg.parts.find(p => p.text);
                        if (!textPart) return null;
                        
                        return (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[var(--color-primary)] text-white rounded-br-sm' : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-bl-sm'}`}>
                                    {textPart.text}
                                </div>
                            </div>
                        );
                    })}
                    
                    {isLoading && (
                        <div className="flex justify-start animate-fade-in">
                            <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl rounded-bl-sm px-4 py-3">
                                <Loader2 className="h-4 w-4 animate-spin text-[var(--color-primary)]" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 border-t border-[var(--color-border)] bg-[var(--color-surface-elevated)] rounded-b-2xl">
                    <form 
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="flex items-center gap-2"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                        />
                        <button 
                            type="submit" 
                            disabled={isLoading || !input.trim()}
                            className="p-2.5 bg-[var(--color-primary)] text-white rounded-full disabled:opacity-50 transition-transform hover:scale-105 active:scale-95"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
