import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Shield, Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (pass: string) => pass.length >= 6;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (!validatePassword(password)) {
      return setError("Password must be at least 6 characters");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, displayName);
      navigate("/login");
    } catch (err) {
      setError("Failed to create an account. Email may already be in use.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzFmMjkzNyIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjIiLz48L2c+PC9zdmc+')] opacity-30"></div>

      <div className="w-full max-w-md relative">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-blue-100">Join the Policy Rule Engine Platform</p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* UI unchanged – inputs omitted here for brevity */}
              {/* keep exactly your existing JSX */}
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                Already have an account? <span className="underline">Sign in</span>
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Enterprise Decision Platform • Secure & Compliant
        </p>
      </div>
    </div>
  );
}
