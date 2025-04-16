import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Routes/Routes.tsx'
import { CartContextProvider } from './context/CartContext.tsx'

// 🧠 Redux Provider ve store importları
import { Provider } from 'react-redux'
import { store } from '../src/Store/store.ts' // store'u oluşturduğun dosyanın yolu doğru olmalı

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </Provider>
  </StrictMode>
)
