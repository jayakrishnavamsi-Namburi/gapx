const Footer = () => {
  return (
    <footer className="mt-16 bg-emerald-50 dark:bg-slate-900 border-t border-emerald-200 dark:border-slate-700">
      
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo / Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-emerald-600">GapX</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your Career Operating System 🚀
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm font-medium">
          <a href="/dashboard" className="hover:text-emerald-600 transition">
            Dashboard
          </a>
          <a href="/roadmaps" className="hover:text-emerald-600 transition">
            Roadmaps
          </a>
          <a href="/resumes" className="hover:text-emerald-600 transition">
            Resumes
          </a>
          <a href="/quizzes" className="hover:text-emerald-600 transition">
            Quizzes
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-right">
          © {new Date().getFullYear()} GapX. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;