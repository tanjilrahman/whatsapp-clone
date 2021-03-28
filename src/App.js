import { Router, Route, Switch } from 'react-router-dom';

import './styles/App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import { createBrowserHistory } from 'history';
import PageNotFound from './components/PageNotFound';
import PublicRoute from './AppRoute/PublicRoute';
import PrivateRoute from './AppRoute/PrivateRoute';


export const history = createBrowserHistory()

const App = () => (
  <div className="app">
    <Router history={history}>
      <div className="app__body">
      <Sidebar />
      <Switch>
          <PublicRoute path="/" component={Login} exact={true} />
          <PrivateRoute path="/rooms/:roomId" component={Chat} />
          <Route component={PageNotFound} />
      </Switch>
      </div>
    </Router>
  </div>
)

export default App;
