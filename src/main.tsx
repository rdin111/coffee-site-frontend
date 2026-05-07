import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {Provider} from 'react-redux';
import {store} from "./app/store.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,       // Data stays fresh for 5 minutes — avoids unnecessary refetches
            gcTime: 10 * 60 * 1000,          // Keep unused data in cache for 10 minutes
            refetchOnWindowFocus: false,      // Don't refetch every time user tabs back
            retry: 2,                         // Retry failed requests twice
        },
    },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
      </QueryClientProvider>
        </Provider>
      </StrictMode>,
)
