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
import { Blog, BlogArticlePage } from '../components/blog'
import Fighters from './fighters'
import Discussion from './discussions'
import Analytics from './analytics'
import Shows from './shows'
import { ScorecardsPage } from '../components/scorecards'
import theme from '../theme'
import { PoundPage } from './pound'
import { ScorecardsSearch } from './scorecards-search'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/logout" element={<Home />} />
            <Route exact path="/learn-more" element={<LearnMore />} />
            <Route exact path="/scoring/:groupScorecardId/:fightId" element={<Scoring />} />
            <Route exact path="/scoring" element={<Scoring />} />
            <Route exact path="/blog" element={<Blog />} />
            <Route exact path="/blog/:blogId" element={<BlogArticlePage />} />
            <Route exact path="/featured-fights/:id" element={<FeaturedFights />} />
            <Route exact path="/live" element={<CounterPunch />} />
            <Route exact path="/discussions" element={<Discussion />} />
            <Route exact path="/discussions/:id" element={<Discussion />} />
            <Route exact path="/scorecards" element={
              <PrivateRoute>
                <ScorecardsPage /> 
              </PrivateRoute>
            }/>
            <Route exact path="/fighters" element={
              <PrivateRoute>
                <Fighters /> 
              </PrivateRoute>
            }/>
            <Route exact path="/fighters/:id" element={
              <PrivateRoute>
                <Fighters /> 
              </PrivateRoute>
            }/>
            <Route exact path="/scorecards/:initialScorecardId" element={
              <PrivateRoute>
                <ScorecardsSearch /> 
              </PrivateRoute>
            }/>
            <Route exact path="/scorecards/user/:userId" element={
              <PrivateRoute>
                <ScorecardsSearch /> 
              </PrivateRoute>
            }/>
            <Route exact path="/analytics" element={
              <PrivateRoute>
                <Analytics /> 
              </PrivateRoute>
            }/>
            <Route exact path="/analytics/:getShowId" element={
              <PrivateRoute>
                <Analytics /> 
              </PrivateRoute>
            }/>
            <Route exact path="/shows" element={<Shows />}/>
            {/* <Route exact path="/shows" element={
              <PrivateRoute>
                <Shows /> 
              </PrivateRoute>
            }/> */}
            <Route exact path="/shows/:id" element={
              <PrivateRoute>
                <Shows /> 
              </PrivateRoute>
            }/>
            <Route exact path="/shows" element={<Shows />} />
            <Route exact path="/pound" element={
              <PrivateRoute>
                <PoundPage />
              </PrivateRoute>
            }/>
            <Route exact path="/dashboard/:type" element={
              <PrivateRoute>
                <Dashboard /> 
              </PrivateRoute>
            }/>
            <Route exact path="/dashboard/:type/:showId" element={
              <PrivateRoute>
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
