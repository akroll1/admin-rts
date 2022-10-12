import '@fontsource/koulen'
import '@fontsource/lato'
import { createRoot } from 'react-dom/client'
import App from './pages/App'
import { BrowserRouter } from "react-router-dom"
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import TagManager from 'react-gtm-module'
// import { reportWebVitals} from 'web-vitals'
import { ColorModeScript } from '@chakra-ui/react'
const tagManagerArgs = {
    gtmId: 'GTM-T38SJF8'
}
TagManager.initialize(tagManagerArgs)
const root = createRoot(document.getElementById('root')!);
localStorage.setItem('chakra-ui-color-mode', 'dark')
root.render(
  <BrowserRouter>
    <ColorModeScript />
    <App />
  </BrowserRouter>
);


serviceWorkerRegistration.register();

// https://bit.ly/CRA-vitals
// reportWebVitals();
