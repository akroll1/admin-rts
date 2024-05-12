import { Routes, Route } from 'react-router-dom'
import { 
  AuthLayout,
  SharedOutlet,
  UnAuthLayout, 
} from '../components/layout'
import { Dashboards } from './dashboards'
import { ChakraProvider } from '@chakra-ui/react'
import { Auth } from './auth'
import About from '../components/content/about'
import { Forms } from './forms'
import { SignInPage } from '../components/signin'
import theme from '../theme'
import { HelmetProvider } from 'react-helmet-async'
import { HelmetCSP } from '../components/helmet'
import { useGlobalStore } from '../stores'
import { NotFound } from '../components/content'
import { LearnMore } from '../components/content/learn-more'
import { HomePage } from './home'

const App = () => {

  const { user } = useGlobalStore()

  return (
    <HelmetProvider>
      <HelmetCSP />
        <ChakraProvider theme={theme}>
            {user?.isLoggedIn ? <AuthedApp /> : <UnAuthedApp />}
        </ChakraProvider>
    </HelmetProvider>
  );
}

const sharedRoutes = [
  <Route key="0" index element={<HomePage />} />,
  <Route key="1" exact path="about" element={<About />} />,
  <Route key="2" exact path="auth" element={<Auth />} />,
  <Route key="2" exact path="learn-more" element={<LearnMore />} />,
  <Route key="3" exact path="signin" element={<SignInPage />} />,
  <Route key="4" path="*" element={<NotFound />} />
];

const UnAuthedApp = () => {
  return (
    <Routes>
      <Route path='/' element={<UnAuthLayout />}>
        <Route path="/" children={sharedRoutes} element={<SharedOutlet />} />
      </Route>
    </Routes>
  )
}

const AuthedApp = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/dashboards/:type?" element={<Dashboards />} />
        <Route path="/forms/:type?" element={<Forms />} />
        
        <Route path="/" children={sharedRoutes} element={<SharedOutlet />} />
      </Route>
    </Routes>
  )
}

export default App;
