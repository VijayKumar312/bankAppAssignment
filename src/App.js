import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css';
import ProtectedRoute from './ProtectedRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import Test from './pages/Home/test';
function App() {
  return (
    <div>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/test" component={Test} />
            <ProtectedRoute path="/" component={Home} />           
          </Switch>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
