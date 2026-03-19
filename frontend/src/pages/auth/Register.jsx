// import { useState } from "react";
// import { registerUser } from "../../api/authApi";
// import { useNavigate, Link } from "react-router-dom";
// import { auth } from "../../api/firebase.js";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import API from "../../api/axios";

// export default function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const provider = new GoogleAuthProvider();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await registerUser(form);
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.message || "Register failed");
//     }
//   };

//   const handleGoogleRegister = async () => {
//     try {
//       setError("");
//       const result = await signInWithPopup(auth, provider);
//       const token = await result.user.getIdToken();
      
//       // Sending to your backend to create a user via Google
//       const res = await API.post("/auth/google", { token });
      
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       navigate("/dashboard");
//     } catch (err) {
//       setError("Google registration failed");
//     }
//   };

//   return (
//     <div className="flex h-screen w-screen overflow-hidden bg-white font-sans text-slate-900">
      
//       {/* LEFT SIDE: Startup Image/Branding Section */}
//       <div className="hidden lg:flex flex-[1.2] relative bg-[#0f172a] items-center justify-center p-20">
//         <div className="absolute inset-0 opacity-20" 
//              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
//         </div>
        
//         <div className="relative z-10 w-full max-w-xl">
//           <div className="mb-8 inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
//             Version 2.0 Live
//           </div>
//           <h1 className="text-6xl font-tight tracking-tighter text-white mb-6">
//             Start your <br /> 
//             <span className="text-slate-500 text-5xl">journey today.</span>
//           </h1>
//           <p className="text-lg text-slate-400 max-w-sm leading-relaxed">
//             Join thousands of developers building the future of the web.
//           </p>
//         </div>

//         <div className="absolute bottom-12 left-12 flex items-center gap-4 text-slate-500 text-sm italic">
//           <div className="h-1 w-12 bg-emerald-500"></div>
//           Free tier available • Secure by default
//         </div>
//       </div>

//       {/* RIGHT SIDE: Clean Modern Form */}
//       <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white overflow-y-auto">
//         <div className="w-full max-w-[400px]">
          
//           <div className="mb-10 text-left">
//             <h2 className="text-3xl font-bold tracking-tight text-slate-900">Create Account</h2>
//             <p className="text-slate-500 mt-2">Sign up in less than 30 seconds.</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
//               <input
//                 type="text"
//                 placeholder="John Doe"
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 required
//                 className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email</label>
//               <input
//                 type="email"
//                 placeholder="name@company.com"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 required
//                 className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
//               />
//             </div>

//             <div>
//               <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Password</label>
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 required
//                 className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
//               />
//             </div>

//             {error && (
//               <div className="text-red-500 text-xs font-semibold py-1">
//                 {error}
//               </div>
//             )}

//             <button 
//               type="submit" 
//               className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-semibold shadow-sm hover:bg-slate-800 transition-all active:scale-[0.98] mt-2"
//             >
//               Get Started
//             </button>

//             <div className="relative flex items-center py-4">
//               <div className="flex-grow border-t border-slate-100"></div>
//               <span className="flex-shrink mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">or sign up with</span>
//               <div className="flex-grow border-t border-slate-100"></div>
//             </div>

//             <button
//               type="button"
//               onClick={handleGoogleRegister}
//               className="w-full py-3 flex items-center justify-center gap-3 border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98]"
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

//           <footer className="mt-8 text-center">
//             <p className="text-slate-500 text-sm">
//               Already have an account? 
//               <Link to="/login" className="ml-1 text-emerald-600 font-semibold hover:text-emerald-500 transition-colors">
//                 Sign in here
//               </Link>
//             </p>
//           </footer>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { registerUser } from "../../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../api/firebase.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import API from "../../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await registerUser(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setError("");
      setLoading(true);
      
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      
      // Use the same googleAuth endpoint - it handles both login and registration
      const res = await API.post("/auth/google", { token });
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
      
    } catch (err) {
      console.error("Google registration error:", err);
      
      // Handle specific error cases
      if (err.response?.status === 400) {
        if (err.response?.data?.message === "Please login using email & password") {
          setError("This email is already registered with email/password. Please login using your email and password.");
        } else {
          setError(err.response?.data?.message || "Google registration failed");
        }
      } else {
        setError("Google registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* LEFT SIDE: Premium Gradient Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-800">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Floating Gradient Orbs */}
        <div className="absolute top-20 -left-20 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 -right-20 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-20 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        {/* Glass Card Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-16">
          <div className="max-w-lg backdrop-blur-sm bg-white/10 p-12 rounded-3xl border border-white/20 shadow-2xl">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-sm font-medium text-white">Join 10,000+ developers</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Start building
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">
                for free today
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Get instant access to our entire platform. No credit card required. Cancel anytime.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
              {[
                '✨ Unlimited projects',
                '📊 Advanced analytics',
                '🔧 Developer tools',
                '🎯 Priority support'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-white/90">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-white/80 text-sm italic mb-3">
                "The easiest platform to get started with. Had my first project deployed in minutes!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400"></div>
                <div>
                  <p className="text-white font-medium text-sm">Sarah Chen</p>
                  <p className="text-white/50 text-xs">Lead Developer, TechFlow</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
      </div>

      {/* RIGHT SIDE: Premium Glass Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md py-12">
          {/* Logo */}
          <div className="mb-10">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl shadow-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-white">G</span>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Create an account</h2>
            <p className="text-slate-500">Start your journey with us today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Full name</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur"></div>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  disabled={loading}
                  className="relative w-full px-5 py-4 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email address</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur"></div>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  disabled={loading}
                  className="relative w-full px-5 py-4 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur"></div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  disabled={loading}
                  className="relative w-full px-5 py-4 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              
              {/* Password Strength Indicator */}
              <div className="mt-2 flex items-center gap-2">
                <div className="flex gap-1 flex-1">
                  {[1, 2, 3].map((level) => (
                    <div 
                      key={level} 
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        form.password.length >= level * 3 
                          ? level === 1 
                            ? 'bg-red-400' 
                            : level === 2 
                              ? 'bg-yellow-400' 
                              : 'bg-emerald-400'
                          : 'bg-slate-200'
                      }`}
                    ></div>
                  ))}
                </div>
                <span className="text-xs text-slate-400">
                  {form.password.length === 0 && 'Enter password'}
                  {form.password.length > 0 && form.password.length < 6 && 'Weak'}
                  {form.password.length >= 6 && form.password.length < 10 && 'Medium'}
                  {form.password.length >= 10 && 'Strong'}
                </span>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 py-2">
              <input
                type="checkbox"
                id="terms"
                required
                disabled={loading}
                className="mt-1 w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 disabled:opacity-50"
              />
              <label htmlFor="terms" className="text-sm text-slate-500">
                I agree to the{' '}
                <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">Privacy Policy</a>
              </label>
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
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:from-emerald-700 hover:to-teal-700 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-400">Or sign up with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleRegister}
              disabled={loading}
              className="w-full py-4 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>{loading ? 'Processing...' : 'Google'}</span>
            </button>
          </form>

          {/* Sign in link */}
          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
              Sign in here
            </Link>
          </p>

          {/* Trust badges */}
          <div className="mt-10 flex justify-center gap-6 text-xs text-slate-400">
            <span>🔒 256-bit encryption</span>
            <span>⚡️ Free tier included</span>
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
}