import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App'
import { BrowserRouter } from "react-router-dom"
import TagManager from 'react-gtm-module'
// import { reportWebVitals} from 'web-vitals'
import { ColorModeScript } from '@chakra-ui/react'
const tagManagerArgs = {
    gtmId: 'GTM-T38SJF8'
}

TagManager.initialize(tagManagerArgs)
const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ColorModeScript />
    <App />
  </BrowserRouter>
);

// serviceWorker.unregister();

// https://bit.ly/CRA-vitals
// reportWebVitals();
