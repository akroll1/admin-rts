import { Routes, Route } from 'react-router-dom'
import { Layout } from '../components/layout'
import Home from './home'
import { ChakraProvider } from '@chakra-ui/react'
import About from '../components/content/about'
import Dashboard from './dashboard'
import { SignInPage } from '../components/signin'
import { LearnMore, NotFound } from '../components/content'
import { PrivateRoute } from '../components/content/partials'
import theme from '../theme'
import { MessageCenter } from '../components/message-center/message-center'
import { BroadcastCenter } from './broadcast-center'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signin" element={<SignInPage />} />
            <Route exact path="/dashboard/:type" element={

                <Dashboard /> 
            }/>
            {/* <Route exact path="/dashboard/:type" element={
              <PrivateRoute>
                <Dashboard /> 
              </PrivateRoute>
            }/> */}
            <Route exact path="/broadcast" element={<BroadcastCenter />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/learn-more" element={<LearnMore />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
    </ChakraProvider>
  );
}

export default App;
