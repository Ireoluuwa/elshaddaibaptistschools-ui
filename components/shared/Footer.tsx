import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0b1215] text-[#94a3b8] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="El-Shaddai Baptist School Logo"
                className="h-20 w-auto"
              />
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              A premier learning institution committed to raising leaders with
              character and intellect.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/p/El-Shaddai-Baptist-School-Ibadan-100066433942876/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#006442] transition-all text-white border border-white/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/ebs_ibadan/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#006442] transition-all text-white border border-white/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-4 text-sm font-medium">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Academics", href: "/academics" },
                { name: "Admissions", href: "/admissions" },
                { name: "Gallery", href: "/gallery" },
                { name: "News & Events", href: "/news" },
                { name: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link className="hover:text-white transition-colors" href={link.href}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4">
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#006442] shrink-0 mt-0.5" size={18} />
                <span className="leading-relaxed">
                  12 Education Road, Victoria Island,<br />Lagos, Nigeria.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#006442] shrink-0" size={18} />
                <span>+234 801 234 5678</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-[#006442] shrink-0 mt-0.5" size={18} />
                <span className="break-all">admissions@elshaddaibaptist.edu.ng</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Location
            </h3>
            <div className="rounded-xl overflow-hidden h-40 bg-white/5 border border-white/10 group cursor-pointer">
              <img
                alt="Map of Nigeria location"
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX99Glh_Mwh_ZxiM7URnwrVuQkq7QPMannkCV_2KTTCVgWLtYePDGoi-gxEbIrv11qMcVtzQMW5l1GDvPT4H14yAdGZMQgh0L-bgMCHTmdwmsXRzI2pR_SiQMi75A7XReLjd1JnkSo2h99ceSZWjdFLMI7IjGHxstgXq2bAGCNalP-f715ELpu4kI6XMpnth0PaHRulm15l-pF5CXD4mS4lcMR2nD3vY2WmYRB1Q-7y08putFuMNom4fzydxzCnOkjyHis00mfQg"
              />
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-medium tracking-wide">
          <p>© 2023 El-Shaddai Baptist School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
