import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserList from "./pages/UserList";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="signup" element={<SignUp />} />
        <Route exact path="users" element={<UserList />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
