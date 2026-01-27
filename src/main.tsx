import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store'
import './index.css'
import router from './routes'
// import 'virtual:svg-icons-register';
createRoot(document.getElementById('react-app')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>加载中...</div>} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
