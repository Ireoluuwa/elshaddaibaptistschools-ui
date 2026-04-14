import React from "react";
import { School, MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#101519] text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-white mb-2">
              <School className="text-3xl text-primary" size={32} />
              <h2 className="text-xl font-bold">
                El-Shaddai Baptist
                <br />
                School
              </h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              A premier learning institution committed to raising leaders with
              character and intellect.
            </p>
            <div className="flex gap-4 mt-2">
              <a
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white"
                href="#"
              >
                <Facebook size={16} fill="currentColor" />
              </a>
              <a
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white"
                href="#"
              >
                <Twitter size={16} fill="currentColor" />
              </a>
              <a
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white"
                href="#"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  School Portal
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Academic Calendar
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Staff Directory
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Alumni
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary shrink-0" size={18} />
                <span>12 Education Road, Victoria Island, Lagos, Nigeria.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary shrink-0" size={18} />
                <span>+234 801 234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary shrink-0" size={18} />
                <span>admissions@elshaddaibaptist.edu.ng</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">
              Location
            </h3>
            <div className="rounded-lg overflow-hidden h-40 bg-gray-800">
              <img
                alt="Map showing location in Lagos, Nigeria"
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX99Glh_Mwh_ZxiM7URnwrVuQkq7QPMannkCV_2KTTCVgWLtYePDGoi-gxEbIrv11qMcVtzQMW5l1GDvPT4H14yAdGZMQgh0L-bgMCHTmdwmsXRzI2pR_SiQMi75A7XReLjd1JnkSo2h99ceSZWjdFLMI7IjGHxstgXq2bAGCNalP-f715ELpu4kI6XMpnth0PaHRulm15l-pF5CXD4mS4lcMR2nD3vY2WmYRB1Q-7y08putFuMNom4fzydxzCnOkjyHis00mfQg"
              />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2023 El-Shaddai Baptist School. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-white" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-white" href="#">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
