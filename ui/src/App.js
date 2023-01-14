import './App.css';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import { CreateBlog } from './pages/create-blog';
import { SignUp } from './pages/signup';
import { DashBoard } from './pages/dashboard';

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
          <DashBoard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
