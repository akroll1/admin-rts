import React, {useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '../components/layout'
import Home from './home'
import { ChakraProvider } from '@chakra-ui/react'
import About from '../components/content/about'
import Dashboard from './dashboard'
import Scoring from './scoring'
import { SignIn } from '../components/signin'
import { LearnMore, NotFound } from '../components/content'
import { PrivateRoute } from '../components/partials'
import FeaturedFights from './featured-fights'
import CounterPunch from './counterpunch'
import { Blog, BlogArticle } from '../components/blog'
import Fighters from './fighters'
import Discussion from './discussions'
import Shows from './shows'
import theme from '../theme'
import { PoundPage } from './pound'

const App = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') == 'true');
  return (
    <ChakraProvider theme={theme}>
        <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} >
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/logout" element={<Home />} />
            <Route exact path="/learn-more" element={<LearnMore />} />
            <Route exact path="/scoring/:groupScorecardId" element={<Scoring />} />
            <Route exact path="/scoring" element={<Scoring />} />
            <Route exact path="/fighters" element={<Fighters />} />
            <Route exact path="/fighters/:id" element={<Fighters />} />
            <Route exact path="/blog" element={<Blog />} />
            <Route exact path="/blog/:id" element={<BlogArticle />} />
            <Route exact path="/featured-fights/:id" element={<FeaturedFights />} />
            <Route exact path="/counterpunch" element={<CounterPunch />} />
            <Route exact path="/discussions" element={<Discussion />} />
            <Route exact path="/discussions/:id" element={<Discussion />} />
            <Route exact path="/shows/:id" element={<Shows />} />
            <Route exact path="/shows" element={<Shows />} />
            <Route exact path="/pound" element={
              <PrivateRoute setIsLoggedIn={setIsLoggedIn}>
                <PoundPage />
              </PrivateRoute>
            }/>
            <Route exact path="/dashboard/:type" element={
              <PrivateRoute setIsLoggedIn={setIsLoggedIn}>
                <Dashboard /> 
              </PrivateRoute>
            }/>
            <Route exact path="/dashboard/:type/:showId" element={
              <PrivateRoute setIsLoggedIn={setIsLoggedIn}>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
    </ChakraProvider>
  );
}

export default App;
