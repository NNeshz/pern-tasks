import { Routes, Route, Outlet } from "react-router-dom";

import { useAuth } from "./context/authContext";
import { TaskProvider } from "./context/tasksContext";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TasksPage from "./pages/TaskPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

import Navbar from "./components/navbar/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";


// Venir a revisar si funciona el loading
function App() {
  const { isAuth, loading } = useAuth();

  if(loading) return <h1>Loading...</h1>

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          element={<ProtectedRoute isAllowed={!isAuth} redirectTo="/tasks" />}
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route
          element={<ProtectedRoute isAllowed={isAuth} redirectTo="/login" />}
        >
          <Route
            element={
              <TaskProvider>
                <Outlet />
              </TaskProvider>
            }
          >
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/tasks/new" element={<TaskFormPage />} />
            <Route path="/tasks/:id/edit" element={<TaskFormPage />} />
          </Route>

          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
