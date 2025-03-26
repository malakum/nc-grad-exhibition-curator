import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')).render(
  // <Auth0Provider
  //     domain="dev-ptf1e8gtflmoy1bg.us.auth0.com"
  //   clientId="jc0MSSdBNuhyTtay8rNcDWz7Q7oADDv4"
  //   authorizationParams={{
  //     redirect_uri: window.location.origin
  //   }}
  // >
    
  //   <App />
  // </Auth0Provider>,
  <StrictMode>
    <App />
  </StrictMode>,
)
