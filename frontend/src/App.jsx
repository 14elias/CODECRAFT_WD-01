import Login from "./route/Login"
import Home from "./route/Home";
import Register from "./route/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {
  return (
      <Router>
        <Routes>
          <Route path="login/" element={<Login></Login>}/>
          <Route path="home/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="register/" element={<Register/>}/>
        </Routes>
      </Router>
  )
}

export default App
