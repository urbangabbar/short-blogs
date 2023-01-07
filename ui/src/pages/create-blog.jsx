import { useHistory } from "react-router-dom";
export const CreateBlog = () => {
  const history = useHistory();
  return (
    <div>
      <h1>Welcome to short blogs</h1>
      <p>It is a great microblogging website</p>
      <div>
        <h2>New User??</h2>
        <button onClick={() => history.push("/create-blog/signup")}>
          Signup
        </button>
      </div>
      <div>
        <h2>Existing User</h2>
        <button onClick={() => history.push("/create-blog/login")}>
          Login
        </button>
      </div>
    </div>
  );
};
