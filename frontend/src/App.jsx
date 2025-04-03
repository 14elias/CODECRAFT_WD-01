import Login from "./route/Login"
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {
  return (
      <Router>
        <Routes>
          <Route path="login/" element={<Login></Login>}/>
        </Routes>
      </Router>
  )
}

export default App
