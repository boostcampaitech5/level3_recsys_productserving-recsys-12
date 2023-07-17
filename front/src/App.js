import logo from './logo.svg';
import './App.css';
//import Message from './component/Message';
//import Dashboard from './component/Dashboard';
import SignIn from './component/SignIn';
import SignUp from "./component/SignUp";
import Blog from './component/Blog/Blog';
import RecPage from './component/RecPage';
import { Routes, Route, BrowserRouter,Navigate} from "react-router-dom";

function App() {
  const check = true;

  return (
     <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            check ? <Navigate to="/SignIn" /> : <Navigate to="/SignIn" />
          }
        />
        <Route path="/SignIn" element={<SignIn />} />
        {/* <SignUp /> */}
        <Route path="/SignUp" element={<SignUp/>} />
        {/* <SignIn /> */}
        <Route path="/SignIn" element={<SignIn/>} />
        {/* <Blog /> */}
        <Route path="/MainPage" element={<Blog/>} />
        {/* <RecPage /> */}
        <Route path="/RecPage" element={<RecPage/>} />
        
      </Routes>
    </BrowserRouter> 
  );
}

export default App;