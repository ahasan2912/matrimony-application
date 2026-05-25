import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PersistGate } from "redux-persist/integration/react";
import router from './routes/Route.jsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './app/store.js'
import GoogleTranslator from './components/shared/GoogleTranslator.jsx';
import InitialPageLoader from './components/loading- skeletons/InitialPageLoader.jsx';
import { Bounce, ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleTranslator />
      <PersistGate loading={<InitialPageLoader />} persistor={persistor}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </PersistGate>
    </Provider>
  </StrictMode>
)


