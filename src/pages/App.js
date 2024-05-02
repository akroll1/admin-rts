import { Routes, Route } from 'react-router-dom'
import { Layout } from '../components/layout'
import Home from './home'
import { Dashboards } from './dashboards'
import { ChakraProvider } from '@chakra-ui/react'
import About from '../components/content/about'
import { Forms } from './forms'
import { SignInPage } from '../components/signin'
import { LearnMore, NotFound } from '../components/content'
import theme from '../theme'
import { BroadcastCenter } from './broadcast-center'
import { Auth } from './auth'
import { HelmetProvider } from 'react-helmet-async'

const App = () => {
  return (
    <HelmetProvider>
      <ChakraProvider theme={theme}>
          <Layout>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/auth" element={<Auth />} />
              <Route exact path="/broadcast" element={<BroadcastCenter />} />
              <Route exact path="/signin" element={<SignInPage />} />
              <Route exact path="/dashboards/:type" element={
                  <Dashboards /> 
              }/>
              <Route exact path="/forms/:type" element={
                  <Forms /> 
              }/>
              <Route exact path="/about" element={<About />} />
              <Route exact path="/learn-more" element={<LearnMore />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
      </ChakraProvider>
    </HelmetProvider>
  );
}

export default App;
