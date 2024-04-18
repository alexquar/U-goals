import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  function Logout() {
    localStorage.clear()
    return <Navigate to="/login" />
  }
  
  function RegisterAndLogout() {
    localStorage.clear()
    return <Signup />
  }
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;