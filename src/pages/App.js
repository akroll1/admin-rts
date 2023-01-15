import { Routes, Route } from 'react-router-dom'
import { Layout } from '../components/layout'
import Home from './home'
import { ChakraProvider } from '@chakra-ui/react'
import About from '../components/content/about'
import Dashboard from './dashboard'
import Scoring from './scoring'
import { SignIn } from '../components/signin'
import { LearnMore, NotFound } from '../components/content'
import { PrivateRoute } from '../components/content/partials'
import { Blog, BlogArticlePage } from '../components/blog'
import Shows from './shows'
import { Scorecards } from '../components/scorecards'
import theme from '../theme'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/learn-more" element={<LearnMore />} />
            <Route exact path="/scoring/:groupScorecardId/:fightId" element={<Scoring />} />
            <Route exact path="/scoring" element={<Scoring />} />
            <Route exact path="/blog" element={<Blog />} />
            <Route exact path="/blog/:blogId" element={<BlogArticlePage />} />
            <Route exact path="/scorecards" element={
              <PrivateRoute>
                <Scorecards /> 
              </PrivateRoute>
            }/>
            <Route exact path="/shows" element={<Shows />} />
            <Route exact path="/shows/:fightIdParam" element={<Shows />} />
            <Route exact path="/shows" element={<Shows />} />
            <Route exact path="/dashboard/:type" element={
              <PrivateRoute>
                <Dashboard /> 
              </PrivateRoute>
            }/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
    </ChakraProvider>
  );
}

export default App;
