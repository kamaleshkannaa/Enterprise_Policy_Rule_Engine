// import Dashboard from './components/Dashboard';

// function App() {
//   return <Dashboard />;
// }

// export default App;


// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import AuthPage from "./auth/AuthPage";
// import Dashboard from "./components/Dashboard";
// import ProtectedRoute from "./auth/ProtectedRoute";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Navigate to="/auth" />} />
//         <Route path="/auth" element={<AuthPage />} />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


// import { Routes, Route, Navigate } from "react-router-dom";
// import AuthPage from "./auth/AuthPage";
// import Dashboard from "./components/Dashboard";
// import ProtectedRoute from "./auth/ProtectedRoute";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/auth" />} />
//       <Route path="/auth" element={<AuthPage />} />

//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }

// export default App;


// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./auth/AuthPage";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import UserDashboard from "./user/UserDashboard"; // or wherever your /user page is
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { role } = useAuth();

  return (
    <Routes>
      {/* default → auth */}
      <Route path="/" element={<Navigate to="/auth" />} />

      {/* login / signup */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Admin dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {role === "admin" ? <Dashboard /> : <Navigate to="/user" replace />}
          </ProtectedRoute>
        }
      />

      {/* User view */}
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback: after login, send based on role */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            {role === "admin" ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/user" replace />
            )}
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;


