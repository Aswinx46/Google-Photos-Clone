import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { persistor, store } from './reduxstrore/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'sonner'
import { ErrorBoundary } from './errorBoundary/ErrorBoundary.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <Toaster />
        </ErrorBoundary>
        <App />
      </QueryClientProvider>
    </PersistGate>
  </Provider>

)
