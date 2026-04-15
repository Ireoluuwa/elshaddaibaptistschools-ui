import { GraduationCap, Menu } from "lucide-react";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-[#e9eef1] bg-white/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4 lg:px-20 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-primary">
          <GraduationCap size={28} className="fill-current" />
          <h2 className="text-[#0e2e1d] text-lg font-bold leading-tight flex items-center">
            El-Shaddai Baptist School
          </h2>
        </div>
        <div className="hidden lg:flex items-center gap-12">
          <nav className="flex gap-8">
            <a
              className="text-[#0e2e1d] hover:text-[#006442] text-sm font-semibold transition-colors uppercase tracking-wide"
              href="#"
            >
              Home
            </a>
            <a
              className="text-[#0e2e1d] hover:text-[#006442] text-sm font-semibold transition-colors uppercase tracking-wide"
              href="#"
            >
              About
            </a>
            <a
              className="text-[#0e2e1d] hover:text-[#006442] text-sm font-semibold transition-colors uppercase tracking-wide"
              href="#"
            >
              Admissions
            </a>
            <a
              className="text-[#0e2e1d] hover:text-[#006442] text-sm font-semibold transition-colors uppercase tracking-wide"
              href="#"
            >
              Academics
            </a>
          </nav>
          <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-[#006442] hover:bg-[#005236] text-white text-sm font-bold transition-all shadow-md active:scale-95">
            <span className="truncate">Portal Login</span>
          </button>
        </div>
        <button className="lg:hidden p-2 text-primary dark:text-white">
          <Menu size={24} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
