import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PersistGate } from "redux-persist/integration/react";
import router from './routes/Route.jsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './app/store.js'
import { Toaster } from 'react-hot-toast'
import GoogleTranslator from './components/shared/GoogleTranslator.jsx';
import InitialPageLoader from './components/loading- skeletons/InitialPageLoader.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<InitialPageLoader />} persistor={persistor}>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </PersistGate>
    </Provider>
  </StrictMode>
)


