import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }] = useStateValue();

  return (
  <div className="app">
    {!user ? (
      <Login />
    ) : (
      
      <div className="app__body">
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId"> 
              <Chat />
            </Route>
            <Route path="/">
            
            </Route>
            </Switch>
        </Router>
      </div>
    )}
  </div>  
  );
}

export default App;
