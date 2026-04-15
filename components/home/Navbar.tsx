import {
  GraduationCap,
  Menu,
  Users,
  ShoppingCart,
  UserCircle,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const navLinks = [
    { name: "Home", href: "#", active: true },
    { name: "About Us", href: "#", hasDropdown: true },
    { name: "Events", href: "#", hasDropdown: true },
    { name: "Shop", href: "#", hasDropdown: true },
    { name: "Members", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  return (
    <div className="sticky top-0 z-50 w-full border-b border-[#e9eef1] bg-white/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Main Header Container */}
        <div className="flex items-center justify-between py-4">
          {/* Logo Section */}
          <div className="flex items-center gap-2 text-[#006442]">
            <GraduationCap size={32} className="fill-current" />
          </div>

          {/* Desktop Navigation & Actions */}
          <div className="hidden lg:flex flex-col items-end gap-2">
            {/* Top Tier Icons */}
            <div className="flex items-center gap-6 mb-1">
              <button className="text-[#0e2e1d] hover:text-[#006442] transition-colors">
                <Users size={18} />
              </button>
              <button className="text-[#0e2e1d] hover:text-[#006442] transition-colors font-bold">
                <ShoppingCart size={18} />
              </button>
              <button className="text-[#0e2e1d] hover:text-[#006442] transition-colors">
                <UserCircle size={18} />
              </button>
            </div>

            {/* Bottom Tier Links and Button */}
            <div className="flex items-center gap-10">
              <nav className="flex gap-8 items-center">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    className={`text-sm font-semibold transition-colors flex items-center gap-1 ${
                      link.active
                        ? "text-[#006442]"
                        : "text-[#0e2e1d] hover:text-[#006442]"
                    }`}
                    href={link.href}
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown size={14} className="mt-0.5" />
                    )}
                  </a>
                ))}
              </nav>
              <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-8 bg-[#006442] hover:bg-[#005236] text-white text-sm font-bold transition-all shadow-md active:scale-95 leading-none">
                <span className="truncate">Be a Member</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 text-[#006442]">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
