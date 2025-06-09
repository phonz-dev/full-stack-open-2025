import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './reducers/store'
import { NotificationContextProvider } from './components/NotificationContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </NotificationContextProvider>
)
