import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./views/homePage";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import PetProfilePage from "./views/petProfilePage";
import Navigation from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <AuthProvider>
          <Navigation />
          <Routes>
            {/* /* <PrivateRoute component={ProtectedPage} path="/protected" exact /> */}
            
            <Route path='/petprofile' element={< PetProfilePage />} />
            <Route path="/login" element={< Login />} />
            <Route path="/register" element={< Register />} />          
            <Route path="/" element={< Home />} />          
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;