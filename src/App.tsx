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


import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./auth/AuthPage";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/auth" element={<AuthPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;


