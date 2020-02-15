import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import { Container } from 'react-bootstrap'
import TimeState from './context/time/TimeState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import MainNav from './components/layouts/MainNav'
import PrivateRoute from './components/routing/PrivateRoute'
import setAuthToken from './components/utils/setAuthToken'
import RecordResult from './components/records/RecordResult'
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
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/record' component={RecordResult} />
              </Switch>
            </Router>
          </Container>
        </AlertState>
      </TimeState>
    </AuthState>
  )
}
export default App
