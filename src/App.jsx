import "./App.css";
import { Home } from "./Home";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Reset_Password } from "./Reset_Password";
import { Forgot_Password } from "./Forgot_Password";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset" element={<Reset_Password />} />
        <Route
          path="/forgotpassword/:id/:token"
          element={<Forgot_Password />}
        />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
