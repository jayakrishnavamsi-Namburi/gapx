// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { setToken } from "../../utils/token";
// import { auth } from "../../api/firebase.js";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import API from "../../api/axios";

// const Login = () => {
//   const { setUser } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const provider = new GoogleAuthProvider();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const res = await fetch("https://gapx.onrender.com/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setError(data.message || "Login failed");
//         return;
//       }
//       setToken(data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       setUser(data.user);
//       navigate("/dashboard");
//     } catch (err) {
//       setError("Network error. Please try again.");
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       setError("");
//       const result = await signInWithPopup(auth, provider);
//       const token = await result.user.getIdToken();
//       const res = await API.post("/auth/google", { token });
//       setToken(res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       setUser(res.data.user);
//       navigate("/dashboard");
//     } catch (err) {
//       setError("Google login failed");
//     }
//   };

//   return (
//     <div className="flex h-screen w-screen overflow-hidden bg-white font-sans text-slate-900">
      
//       {/* LEFT SIDE: Minimalist Dark Image Section */}
//       <div 
//         className="hidden lg:flex flex-[1.2] relative bg-[#0f172a] items-center justify-center p-20"
//       >
//         {/* Abstract Background Decoration */}
//         <div className="absolute inset-0 opacity-20" 
//              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
//         </div>
        
//         <div className="relative z-10 w-full max-w-xl">
//           <div className="mb-8 inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
//             Now in Beta v2.0
//           </div>
//           <h1 className="text-6xl font-tight tracking-tighter text-white mb-6">
//             Build software <br /> 
//             <span className="text-slate-500 text-5xl">without limits.</span>
//           </h1>
//           <p className="text-lg text-slate-400 max-w-sm leading-relaxed">
//             The all-in-one platform for modern developers to scale infrastructure instantly.
//           </p>
//         </div>

//         {/* Subtle bottom detail */}
//         <div className="absolute bottom-12 left-12 flex items-center gap-4 text-slate-500 text-sm italic">
//           <div className="h-1 w-12 bg-emerald-500"></div>
//           Trusted by 10k+ teams
//         </div>
//       </div>

//       {/* RIGHT SIDE: Clean Modern Form */}
//       <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white">
//         <div className="w-full max-w-[400px]">
          
//           <div className="mb-10 text-left">
//             <h2 className="text-3xl font-bold tracking-tight text-slate-900">Sign in</h2>
//             <p className="text-slate-500 mt-2">Welcome back! Please enter your details.</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Email address</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="name@company.com"
//                 required
//                 className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 required
//                 className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
//               />
//             </div>

//             {error && (
//               <div className="text-red-500 text-sm font-medium flex items-center gap-2">
//                 <span className="h-1 w-1 bg-red-500 rounded-full"></span>
//                 {error}
//               </div>
//             )}

//             <button 
//               type="submit" 
//               className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-semibold shadow-sm hover:bg-slate-800 transition-all active:scale-[0.98]"
//             >
//               Sign in to Dashboard
//             </button>

//             <div className="relative flex items-center py-4">
//               <div className="flex-grow border-t border-slate-100"></div>
//               <span className="flex-shrink mx-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">or continue with</span>
//               <div className="flex-grow border-t border-slate-100"></div>
//             </div>

//             <button
//               type="button"
//               onClick={handleGoogleLogin}
//               className="w-full py-3 flex items-center justify-center gap-3 border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98] shadow-sm"
//             >
//               <svg className="w-5 h-5" viewBox="0 0 24 24">
//                 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
//                 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
//                 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
//                 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
//               </svg>
//               Google
//             </button>
//           </form>

//           <footer className="mt-12 text-center">
//             <p className="text-slate-500 text-sm">
//               New here? 
//               <Link to="/register" className="ml-1 text-emerald-600 font-semibold hover:text-emerald-500 transition-colors">
//                 Create an account
//               </Link>
//             </p>
//           </footer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;




import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { setToken } from "../../utils/token";
import { auth } from "../../api/firebase.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import API from "../../api/axios";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const provider = new GoogleAuthProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("https://gapx.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      navigate("/dashboard");
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      const res = await API.post("/auth/google", { token });
      setToken(res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError("Google login failed");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* LEFT SIDE: Premium Gradient Section with Animated Elements */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Floating Gradient Orbs */}
        <div className="absolute top-20 -left-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 -right-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        {/* Glass Card Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-16">
          <div className="max-w-lg backdrop-blur-sm bg-white/10 p-12 rounded-3xl border border-white/20 shadow-2xl">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-sm font-medium text-white">Beta v2.0 - Now Live</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Build without
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
                boundaries
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              The most advanced platform for modern developers. Deploy globally, scale infinitely, and ship faster than ever.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
              {[
                '⚡️ Global edge network',
                '🔒 Enterprise-grade security',
                '🚀 Instant deployments'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-white/90">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-white/30 to-white/10 border-2 border-white/30"></div>
                ))}
              </div>
              <div className="text-white/80 text-sm">
                <span className="font-bold text-white">10,000+</span> teams joined
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
      </div>

      {/* RIGHT SIDE: Premium Glass Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-10">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-white">G</span>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome back</h2>
            <p className="text-slate-500">Enter your credentials to access your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email address</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur"></div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="relative w-full px-5 py-4 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur"></div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="relative w-full px-5 py-4 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 placeholder:text-slate-400"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-600 flex items-center gap-2">
                  <span>⚠️</span>
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 active:translate-y-0"
            >
              Sign in
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-400">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-4 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Google</span>
            </button>
          </form>

          {/* Sign up link */}
          <p className="mt-8 text-center text-sm text-slate-500">
            New to the platform?{' '}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
              Create an account
            </Link>
          </p>

          {/* Trust badges */}
          <div className="mt-10 flex justify-center gap-6 text-xs text-slate-400">
            <span>🔒 256-bit encryption</span>
            <span>⚡️ 99.99% uptime</span>
            <span>🌍 Global CDN</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;