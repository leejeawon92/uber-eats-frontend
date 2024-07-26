import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateAccount } from "../pages/create-account";
import { Login } from "../pages/login";


export const LoggedOutRouter = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<CreateAccount />} />
      </Routes>
    </Router>
  );
};