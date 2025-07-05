import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {Provider} from 'react-redux';
import {store} from "./app/store.tsx";

const queryClient = new QueryClient() // client and cache creation

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
