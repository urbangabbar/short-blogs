import './App.css';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import { CreateBlog } from './pages/create-blog';
import { SignUp } from './pages/signup';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/create-blog">
          <CreateBlog />
        </Route>
        <Route path="/create-blog/signup">
          <SignUp/>
        </Route>
        <Route path="/create-blog/login">
          <div>Login</div>
        </Route>
        <Route path="/create-blog/dashboard">
          <div>Dashboard</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
