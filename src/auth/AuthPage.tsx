// import { useState, FormEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import { Shield, Mail, Lock, User, AlertCircle, Loader2 } from "lucide-react";
// import { useAuth } from "../contexts/AuthContext";

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const { login, signup } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       if (isLogin) {
//         // LOGIN
//         await login(email, password);
//         setSuccess("Successfully logged in!");
//         navigate("/dashboard");
//       } else {
//         // SIGNUP
//         if (!fullName) {
//           setError("Please fill in all fields");
//           setLoading(false);
//           return;
//         }
//         await signup(email, password, fullName);
//         setSuccess("Account created successfully!");
//         navigate("/dashboard");
//       }
//     } catch (err: any) {
//       setError(err?.message || "Authentication failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

//       <div className="w-full max-w-md relative">
//         <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white">
//             <div className="flex items-center justify-center mb-4">
//               <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
//                 <Shield className="w-10 h-10" />
//               </div>
//             </div>
//             <h1 className="text-2xl font-bold text-center mb-2">
//               Enterprise Policy Engine
//             </h1>
//             <p className="text-blue-100 text-center text-sm">
//               Decision Platform & Rule Management
//             </p>
//           </div>

//           <div className="p-8">
//             <div className="flex mb-6 bg-slate-100 rounded-lg p-1">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsLogin(true);
//                   setError("");
//                   setSuccess("");
//                 }}
//                 className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
//                   isLogin
//                     ? "bg-white text-slate-900 shadow-sm"
//                     : "text-slate-600 hover:text-slate-900"
//                 }`}
//               >
//                 Sign In
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsLogin(false);
//                   setError("");
//                   setSuccess("");
//                 }}
//                 className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
//                   !isLogin
//                     ? "bg-white text-slate-900 shadow-sm"
//                     : "text-slate-600 hover:text-slate-900"
//                 }`}
//               >
//                 Sign Up
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {!isLogin && (
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">
//                     Full Name
//                   </label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                     <input
//                       type="text"
//                       value={fullName}
//                       onChange={(e) => setFullName(e.target.value)}
//                       className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                       placeholder="John Doe"
//                       required
//                     />
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                     placeholder="you@company.com"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                   <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                     placeholder="••••••••"
//                     required
//                     minLength={6}
//                   />
//                 </div>
//               </div>

//               {error && (
//                 <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
//                   <AlertCircle className="w-5 h-5 text-red-600" />
//                   <p className="text-sm text-red-800">{error}</p>
//                 </div>
//               )}

//               {success && (
//                 <div className="flex gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
//                   <AlertCircle className="w-5 h-5 text-green-600" />
//                   <p className="text-sm text-green-800">{success}</p>
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-medium disabled:opacity-50 flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="w-5 h-5 animate-spin" />
//                     Processing...
//                   </>
//                 ) : (
//                   <>{isLogin ? "Sign In" : "Create Account"}</>
//                 )}
//               </button>
//             </form>

//             <div className="mt-6 text-center text-sm text-slate-600">
//               {isLogin ? (
//                 <p>
//                   Need an account?{" "}
//                   <button
//                     type="button"
//                     onClick={() => setIsLogin(false)}
//                     className="text-blue-600 font-medium"
//                   >
//                     Sign up
//                   </button>
//                 </p>
//               ) : (
//                 <p>
//                   Already have an account?{" "}
//                   <button
//                     type="button"
//                     onClick={() => setIsLogin(true)}
//                     className="text-blue-600 font-medium"
//                   >
//                     Sign in
//                   </button>
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         <p className="text-center text-slate-400 text-sm mt-6">
//           Secure authentication powered by enterprise-grade security
//         </p>
//       </div>
//     </div>
//   );
// }




import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Mail,
  Lock,
  User,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ FIX
  const [loading, setLoading] = useState(false);

  const { login, signup, loginWithGoogle, currentUser } = useAuth();
  const navigate = useNavigate();

  // ✅ REDIRECT ONLY AFTER AUTH STATE IS READY
  useEffect(() => {
  if (currentUser) {
    navigate("/dashboard", { replace: true });
  }
}, [currentUser, navigate]);


  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setError("");
  setSuccess("");
  setLoading(true);

  try {
    if (isLogin) {
      await login(email, password);
      setSuccess("Successfully logged in!");
    } else {
      await signup(email, password, fullName);
      setSuccess("Account created successfully!");
    }
  } catch (err: any) {
    setError(err?.message || "Authentication failed");
  } finally {
    setLoading(false);
  }
};


 const handleGoogleLogin = async () => {
  setLoading(true);
  try {
    await loginWithGoogle();
    setSuccess("Logged in with Google!");
  } catch (err: any) {
    setError(err?.message || "Google login failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="w-full max-w-md relative">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
                <Shield className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">
              Enterprise Policy Engine
            </h1>
            <p className="text-blue-100 text-center text-sm">
              Decision Platform & Rule Management
            </p>
          </div>

          <div className="p-8">
            <div className="flex mb-6 bg-slate-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setError("");
                  setSuccess("");
                }}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  isLogin
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                  setSuccess("");
                }}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  !isLogin
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {error && (
                <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {success && (
                <div className="flex gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-green-800">{success}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>{isLogin ? "Sign In" : "Create Account"}</>
                )}
              </button>
            </form>

            {/* 🔵 GOOGLE LOGIN BUTTON */}
            <div className="mt-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full py-3 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-slate-600">
              {isLogin ? (
                <p>
                  Need an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="text-blue-600 font-medium"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="text-blue-600 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-slate-400 text-sm mt-6">
          Secure authentication powered by enterprise-grade security
        </p>
      </div>
    </div>
  );
}
