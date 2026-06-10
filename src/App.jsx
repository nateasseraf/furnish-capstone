import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import NavTabs from "./components/NavTabs";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import ByRoom from "./pages/ByRoom";
import AddItem from "./pages/AddItem";
import Budget from "./pages/Budget";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <NavTabs />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/rooms"
            element={
              <ProtectedRoute>
                <ByRoom />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-item"
            element={
              <ProtectedRoute>
                <AddItem />
              </ProtectedRoute>
            }
          />

          <Route
            path="/budget"
            element={
              <ProtectedRoute>
                <Budget />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <div className="scroll-hint">↓</div>
    </BrowserRouter>
  );
}

export default App;
