import { School, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0b1215] text-[#94a3b8] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-white">
              <div className="w-10 h-10 bg-[#006442] rounded-lg flex items-center justify-center">
                <School className="text-white" size={24} />
              </div>
              <h2 className="text-xl font-bold leading-tight">
                El-Shaddai Baptist
                <br />
                School
              </h2>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              A premier learning institution committed to raising leaders with
              character and intellect.
            </p>
            <div className="flex gap-4">
              {[
                {
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  ),
                },
                {
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  ),
                },
                {
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  ),
                },
              ].map((social, i) => (
                <a
                  key={i}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#006442] transition-all text-white border border-white/10"
                  href="#"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-4 text-sm font-medium">
              {[
                "School Portal",
                "Academic Calendar",
                "Staff Directory",
                "Careers",
                "Alumni",
              ].map((link) => (
                <li key={link}>
                  <a className="hover:text-white transition-colors" href="#">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#006442] shrink-0 mt-0.5" size={18} />
                <span className="leading-relaxed">
                  12 Education Road, Victoria Island,
                  <br />
                  Lagos, Nigeria.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#006442] shrink-0" size={18} />
                <span>+234 801 234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#006442] shrink-0" size={18} />
                <span>admissions@elshaddaibaptist.edu.ng</span>
              </li>
            </ul>
          </div>
          <div>
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
          <div className="flex gap-8">
            <a className="hover:text-white transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-white transition-colors" href="#">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
