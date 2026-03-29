import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        {/* Left */}
        <p>© {new Date().getFullYear()} Shortify. All rights reserved.</p>

        {/* Right Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-indigo-500 transition">
            Home
          </Link>
          <Link to="/privacy" className="hover:text-indigo-500 transition">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-indigo-500 transition">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
