import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css';
import ProtectedRoute from './ProtectedRoute';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <div>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <ProtectedRoute path="/" component={Home} />           
          </Switch>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
