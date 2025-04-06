import Login from "./route/Login"
import Home from "./route/Home";
import Register from "./route/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PasswordResetConfirm from "./components/PasswordResetConfirm";
import PasswordResetRequest from "./components/PasswordResetRequest";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {
  return (
      <Router>
        <Routes>
          <Route path="login/" element={<Login></Login>}/>
          <Route path="home/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="register/" element={<Register/>}/>
          <Route path="/password-reset" element={<PasswordResetRequest />} />
          <Route path="/reset-password/:uidb64/:token" element={<PasswordResetConfirm />} />
        </Routes>
      </Router>
  )
}

export default App
