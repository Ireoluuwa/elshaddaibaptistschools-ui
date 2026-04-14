import React from "react";

const facultyMembers = [
  {
    name: "Dr. Adewale Okafor",
    role: "Principal",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCv-PguxuicDyQHWQvGDJTe60sVBPK63zLCfiRbvnqQhXi6P40gwaq2kRf_jZd3Tk-Olx953HBsfXaYpoZVOvPydNI9_dXCbHpr9mzpVr3ZeDoLvZaqhTSdvzXfhx0vYvjVHs_jMzXiC3vfM7OYfq4Q2n6nOXmTxTka3GMT5fLpgbOpjKgqmu3pn59iF2ITwxJ2JLK2UO8VqJDxsZ-HtlujMMExpscChnnVERA4CaG9FBSHffkksA7yZfpqmfYDghsxzaB1Lspqbw",
  },
  {
    name: "Mrs. Grace Effiong",
    role: "Vice Principal",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOVwJO7F__Ntpc8_m41Pf68q6YvteHyRRIURhMtUuDX2vkKiC8B6hI6_ODOxyw2TTltoaMoQW6PnDE_4Q7OGrHz9xQmTcNRTI-qwXRKsMpAul-PA8YX4KL5vz2id7Kz1YRv0DjE9NqAk231uv60cXs_2X1IrOB2C4BXCS08_Cc64FRga8OgTxlF2MYCkX-dUCXwuk5R3iuk2JOWQwKf8gI92KrrKlWFG8yyyxucFpZSuYvpliegYMhqUsNd5_N34XNk17jZW4QNg",
  },
  {
    name: "Mr. Tunde Bakare",
    role: "Head of Sciences",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD08oDyE0DSAfLyPnJ95wjJ-55mirZ2pAoIRqUrzdlfYoDm73pWbzKJmzSaAdehEPJGyArk8c9mwjH85nlE9BB4gBrR7TI9_VUtF-kswecq4cEit_0S436ByM1YAi-Z56Zy1fEK6PLauSP5dtYzAjnTzY7lh1pb33CDzRTo8E5geMVJCB88uKLwfMohxgJ4JxPpvyzBPjpVbiFwHF32w3owqWVKdIH7lS97SSo2-rWlnmeFUhqDm-mW-xbgsJZ-dYGfLtNz8xzYSA",
  },
  {
    name: "Ms. Amina Yusuf",
    role: "Head of Arts",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNyaQpYkpYVDmR94gzbydsdiWPfXv8gGcGLlXFzPKKN-x-XER8CXS0Q9QEwwSuQmjCaI5c85Gxu1JvBCcyEDsYUQk2_yuWwhP9sdndo0w3II3sQm3BlLy3BnSZ8yswCdxqgiEWfxi6-wcnLitHWJl9kQQVOSnlc6brs7AnlnUMoMgCycFZ-QZtaXdfeQkqvcmYboJgqB2alNC5CG5pmTnyWEFuGZaDp9IPBN0uGqKDDXulkpOYaqQz0wb3yBGg21uX6NhjoCw_WA",
  },
];

const Faculty = () => {
  return (
    <div className="w-full bg-gray-50 dark:bg-[#182026] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-wider text-sm">
            Our Team
          </span>
          <h2 className="text-secondary dark:text-white text-3xl md:text-4xl font-black leading-tight mt-2">
            Meet Our Faculty
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {facultyMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md group-hover:border-primary transition-colors duration-300">
                <img
                  alt={member.name}
                  className="w-full h-full object-cover"
                  src={member.image}
                />
              </div>
              <h3 className="text-secondary dark:text-white text-xl font-bold">
                {member.name}
              </h3>
              <p className="text-primary text-sm font-bold uppercase tracking-wide mt-1">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faculty;
