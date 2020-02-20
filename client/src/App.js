import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import { Container } from 'react-bootstrap'
import TimeState from './context/time/TimeState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Public from './components/records/Public'
import MainNav from './components/layouts/MainNav'
import Footer from './components/layouts/Footer'
import PrivateRoute from './components/routing/PrivateRoute'
import setAuthToken from './components/utils/setAuthToken'
import RecordResult from './components/records/RecordResult'
import NotFound from './pages/NotFound'

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

              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/record' component={RecordResult} />
                <Route exact path='/all' component={Public} />
                <Route exact path='/*' component={NotFound} />
              </Switch>
            </Router>
            <Footer />
          </Container>
        </AlertState>
      </TimeState>
    </AuthState>
  )
}
export default App
