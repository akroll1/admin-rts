import { Routes, Route } from 'react-router-dom'
import { Layout } from '../components/layout'
import Home from './home'
import { ChakraProvider } from '@chakra-ui/react'
import About from '../components/content/about'
import Dashboard from './dashboard'
import { SignIn } from '../components/signin'
import { LearnMore, NotFound } from '../components/content'
import { PrivateRoute } from '../components/content/partials'
import Shows from './shows'
import theme from '../theme'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/dashboard/:type" element={
              <PrivateRoute>
                <Dashboard /> 
              </PrivateRoute>
            }/>
            <Route exact path="/shows" element={<Shows />} />
            <Route exact path="/shows/:fightIdParam" element={<Shows />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/learn-more" element={<LearnMore />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
    </ChakraProvider>
  );
}

export default App;
