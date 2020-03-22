import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
// Components
import Spinner from './components/layouts/Spinner'
import PrivateRoute from './components/routing/PrivateRoute'
import setAuthToken from './components/utils/setAuthToken'
import MainNav from './components/layouts/MainNav'
import Footer from './components/layouts/Footer'
// Context
import TimeState from './context/time/TimeState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
// Code Seperating Links
const Login = lazy(() => import('./components/auth/Login'))
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Public = lazy(() => import('./components/records/Public'))
const Register = lazy(() => import('./components/auth/Register'))
const RecordResult = lazy(() => import('./components/records/RecordResult'))

if (localStorage.token) {
  setAuthToken(localStorage.token)
}
function App() {
  return (
    <AuthState>
      <TimeState>
        <AlertState>
          <Container fluid>
            <Router>
              <MainNav />
              <Suspense fallback={<Spinner />}>
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/record' component={RecordResult} />
                  <Route exact path='/all' component={Public} />
                  <Route exact path='/*' component={NotFound} />
                </Switch>
              </Suspense>
            </Router>
            <Footer />
          </Container>
        </AlertState>
      </TimeState>
    </AuthState>
  )
}
export default App
