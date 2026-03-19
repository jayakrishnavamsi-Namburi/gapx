// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { removeToken } from "../../utils/token";
// import { useEffect, useRef, useState } from "react";
// import api from "../../api/api.js";

// const Navbar = () => {
//   const { user, setUser } = useAuth();
//   const navigate = useNavigate();

//   const [profileOpen, setProfileOpen] = useState(false);
//   const [profilePic, setProfilePic] = useState("");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const dropdownRef = useRef(null);
//   const mobileMenuRef = useRef(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setProfilePic(parsedUser?.profilePic || "");
//     }

//     const loadProfile = async () => {
//       try {
//         if (!localStorage.getItem("token")) return;

//         const res = await api.get("/user/me");
//         const userData = res.data?.user;

//         setProfilePic(userData?.profilePic || "");
//         localStorage.setItem("user", JSON.stringify(userData));
//       } catch (err) {
//         console.log("Profile load error:", err?.response?.data?.message);
//       }
//     };

//     loadProfile();
//   }, []);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setProfileOpen(false);
//       }
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
//         setMobileMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     removeToken();
//     setUser(null);
//     navigate("/login");
//   };

//   const handleUploadPic = async (e) => {
//     try {
//       const file = e.target.files[0];
//       if (!file) return;

//       const formData = new FormData();
//       formData.append("profilePic", file);

//       const res = await api.put("/user/update", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const newPic = res.data?.user?.profilePic;
//       setProfilePic(newPic || "");
//       setProfileOpen(false);
//     } catch (err) {
//       alert(err?.response?.data?.message || "Upload failed");
//     }
//   };

//   return (
//     <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 px-6 py-3">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/dashboard" className="flex items-center no-underline">
//           <span className="text-2xl font-bold text-gray-900">GapX</span>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center gap-2">
//           {user ? (
//             <>
//               <Link to="/dashboard" className="nav-link">
//                 Dashboard
//               </Link>
//               <Link to="/roadmaps" className="nav-link">
//                 Roadmaps
//               </Link>
//               <Link to="/resume/create" className="nav-link">
//                 Resume Builder
//               </Link>
//               <Link to="/quizzes" className="nav-link">
//                 Quizzes
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="nav-link">
//                 Login
//               </Link>
//               <Link to="/register" className="btn-primary">
//                 Get Started
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           {/* Profile Section */}
//           {user && (
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setProfileOpen(!profileOpen)}
//                 className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
//                 aria-label="Profile menu"
//               >
//                 <div className="w-9 h-9">
//                   <img
//                     src={
//                       profilePic ||
//                       `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=4f46e5&color=fff&size=128`
//                     }
//                     alt={user?.name || "Profile"}
//                     className="w-full h-full rounded-full object-cover border border-gray-200"
//                   />
//                 </div>
//                 <span className="hidden sm:inline text-sm font-medium text-gray-700">
//                   {user?.name?.split(' ')[0] || 'User'}
//                 </span>
//                 <svg 
//                   className={`w-4 h-4 text-gray-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`} 
//                   fill="none" 
//                   stroke="currentColor" 
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>

//               {profileOpen && (
//                 <div className="absolute top-12 right-0 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
//                   <div className="px-4 py-3 border-b border-gray-100">
//                     <p className="font-medium text-gray-900">{user?.name || "User"}</p>
//                     <p className="text-sm text-gray-500 truncate mt-0.5">
//                       {user?.email || ""}
//                     </p>
//                   </div>

//                   <div className="py-1">
//                     <label className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
//                       <span className="text-gray-400 text-base">📷</span>
//                       Upload Photo
//                       <input
//                         type="file"
//                         accept="image/*"
//                         hidden
//                         onChange={handleUploadPic}
//                       />
//                     </label>

//                     <button
//                       onClick={() => {
//                         setProfileOpen(false);
//                         navigate("/profile");
//                       }}
//                       className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
//                     >
//                       <span className="text-gray-400 text-base">👤</span>
//                       View Profile
//                     </button>

//                     <button
//                       onClick={() => {
//                         setProfileOpen(false);
//                         navigate("/settings");
//                       }}
//                       className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
//                     >
//                       <span className="text-gray-400 text-base">⚙️</span>
//                       Settings
//                     </button>
//                   </div>

//                   <div className="border-t border-gray-100 mt-1 pt-1">
//                     <button
//                       onClick={handleLogout}
//                       className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
//                     >
//                       <span className="text-red-400 text-base">🚪</span>
//                       Sign Out
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Mobile Menu Button */}
//           <button 
//             className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             aria-label="Toggle menu"
//           >
//             <div className="w-5 h-4 flex flex-col justify-between">
//               <span className={`w-full h-0.5 bg-gray-600 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
//               <span className={`w-full h-0.5 bg-gray-600 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
//               <span className={`w-full h-0.5 bg-gray-600 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
//             </div>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden absolute left-0 right-0 top-full mt-1 bg-white border-t border-gray-200 py-2 shadow-lg" ref={mobileMenuRef}>
//           {user ? (
//             <div className="flex flex-col">
//               <Link 
//                 to="/dashboard" 
//                 className="px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors no-underline"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Dashboard
//               </Link>
//               <Link 
//                 to="/roadmaps" 
//                 className="px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors no-underline"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Roadmaps
//               </Link>
//               <Link 
//                 to="/resume/create" 
//                 className="px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors no-underline"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Resume Builder
//               </Link>
//               <Link 
//                 to="/quizzes" 
//                 className="px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors no-underline"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Quizzes
//               </Link>
//               <div className="border-t border-gray-100 my-1"></div>
//               <button 
//                 onClick={() => {
//                   handleLogout();
//                   setMobileMenuOpen(false);
//                 }}
//                 className="px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors font-medium"
//               >
//                 Sign Out
//               </button>
//             </div>
//           ) : (
//             <div className="flex flex-col">
//               <Link 
//                 to="/login" 
//                 className="px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors no-underline"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Login
//               </Link>
//               <Link 
//                 to="/register" 
//                 className="mx-4 my-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-center font-medium hover:bg-indigo-700 transition-colors no-underline"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Get Started
//               </Link>
//             </div>
//           )}
//         </div>
//       )}

//       <style>{`
//         .nav-link {
//           text-decoration: none;
//           color: #4b5563;
//           font-weight: 500;
//           font-size: 0.95rem;
//           padding: 0.5rem 1rem;
//           border-radius: 6px;
//           transition: all 0.2s ease;
//         }

//         .nav-link:hover {
//           color: #111827;
//           background-color: #f3f4f6;
//         }

//         .btn-primary {
//           background-color: #4f46e5;
//           color: white;
//           font-weight: 500;
//           font-size: 0.95rem;
//           padding: 0.5rem 1.25rem;
//           border-radius: 6px;
//           text-decoration: none;
//           transition: background-color 0.2s ease;
//         }

//         .btn-primary:hover {
//           background-color: #4338ca;
//         }
//       `}</style>
//     </nav>
//   );
// };

// export default Navbar;



import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { removeToken } from "../../utils/token";
import { useEffect, useRef, useState } from "react";
import api from "../../api/api.js";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // First check localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setProfilePic(parsedUser?.profilePic || parsedUser?.picture || "");
        }

        // Then fetch fresh data from API
        if (!localStorage.getItem("token")) return;

        const res = await api.get("/user/me");
        const userData = res.data?.user;

        if (userData) {
          // Handle different possible profile picture field names
          const picUrl = userData.profilePic || userData.picture || userData.avatar || "";
          setProfilePic(picUrl);
          
          // Update localStorage with fresh data
          localStorage.setItem("user", JSON.stringify(userData));
          
          // Update auth context if needed
          if (JSON.stringify(user) !== JSON.stringify(userData)) {
            setUser(userData);
          }
        }
      } catch (err) {
        console.log("Profile load error:", err?.response?.data?.message || err.message);
      }
    };

    loadUserData();
  }, [user, setUser]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    removeToken();
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleUploadPic = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("profilePic", file);

      const res = await api.put("/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const newPic = res.data?.user?.profilePic || res.data?.user?.picture || "";
      setProfilePic(newPic);
      setImageError(false); // Reset error state on successful upload
      
      // Update user in context and localStorage
      if (res.data?.user) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      
      setProfileOpen(false);
    } catch (err) {
      alert(err?.response?.data?.message || "Upload failed");
    }
  };

  const getProfileImageUrl = () => {
    if (profilePic && !imageError) {
      return profilePic;
    }
    
    // Fallback to UI Avatars
    const name = user?.name || "User";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=fff&size=128&bold=true&length=2`;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center no-underline">
          <span className="text-2xl font-bold text-gray-900">GapX</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/roadmaps" className="nav-link">
                Roadmaps
              </Link>
              <Link to="/resume/create" className="nav-link">
                Resume Builder
              </Link>
              <Link to="/quizzes" className="nav-link">
                Quizzes
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Profile Section */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Profile menu"
              >
                <div className="w-9 h-9 relative">
                  <img
                    src={getProfileImageUrl()}
                    alt={user?.name || "Profile"}
                    onError={handleImageError}
                    className="w-full h-full rounded-full object-cover border-2 border-gray-200"
                    referrerPolicy="no-referrer"
                  />
                  {/* Online indicator */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <span className="hidden sm:inline text-sm font-medium text-gray-700">
                  {user?.name?.split(' ')[0] || 'User'}
                </span>
                <svg 
                  className={`w-4 h-4 text-gray-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {profileOpen && (
                <div className="absolute top-12 right-0 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10">
                        <img
                          src={getProfileImageUrl()}
                          alt={user?.name || "Profile"}
                          onError={handleImageError}
                          className="w-full h-full rounded-full object-cover border border-gray-200"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user?.name || "User"}</p>
                        <p className="text-xs text-gray-500">{user?.email || ""}</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-1">
                    <label className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
                      <span className="text-gray-400 text-base">📷</span>
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleUploadPic}
                      />
                    </label>

                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/profile");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="text-gray-400 text-base">👤</span>
                      View Profile
                    </button>

                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/settings");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="text-gray-400 text-base">⚙️</span>
                      Settings
                    </button>
                  </div>

                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <span className="text-red-400 text-base">🚪</span>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-gray-600 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-full h-0.5 bg-gray-600 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-gray-600 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full mt-1 bg-white border-t border-gray-200 py-2 shadow-lg" ref={mobileMenuRef}>
          {user ? (
            <div className="flex flex-col">
              <Link 
                to="/dashboard" 
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/roadmaps" 
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Roadmaps
              </Link>
              <Link 
                to="/resume/create" 
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resume Builder
              </Link>
              <Link 
                to="/quizzes" 
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Quizzes
              </Link>
              <div className="border-t border-gray-100 my-1"></div>
              <button 
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors font-medium"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
              <Link 
                to="/login" 
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="mx-4 my-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-center font-medium hover:bg-indigo-700 transition-colors no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}

      <style>{`
        .nav-link {
          text-decoration: none;
          color: #4b5563;
          font-weight: 500;
          font-size: 0.95rem;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          color: #111827;
          background-color: #f3f4f6;
        }

        .btn-primary {
          background-color: #4f46e5;
          color: white;
          font-weight: 500;
          font-size: 0.95rem;
          padding: 0.5rem 1.25rem;
          border-radius: 6px;
          text-decoration: none;
          transition: background-color 0.2s ease;
        }

        .btn-primary:hover {
          background-color: #4338ca;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;