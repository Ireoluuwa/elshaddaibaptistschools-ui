import Link from "next/link";

const AdmissionsCTA = () => {
  return (
    <div id="apply" className="w-full bg-secondary py-20">
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        <h2 className="text-white text-3xl md:text-4xl font-bold">
          Ready to Secure a Place?
        </h2>
        <p className="text-green-100 text-lg max-w-xl">
          Spaces are limited. Reach out to our admissions team today or visit us at school to pick up an application form.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link
            href="/contact"
            className="flex items-center justify-center rounded-lg h-12 px-10 bg-white text-secondary text-base font-bold hover:bg-gray-100 transition-all shadow-md active:scale-95"
          >
            Contact Admissions
          </Link>
          <a
            href="tel:+2340000000000"
            className="flex items-center justify-center rounded-lg h-12 px-10 border-2 border-white text-white font-bold hover:bg-white hover:text-secondary transition-all duration-300"
          >
            Call Us Now
          </a>
        </div>
        <p className="text-green-300 text-sm mt-2">
          Mon – Fri &nbsp;·&nbsp; 8:00 am – 4:00 pm &nbsp;·&nbsp; 2, Adeoye Street, Agbowo, Ibadan
        </p>
      </div>
    </div>
  );
};

export default AdmissionsCTA;
