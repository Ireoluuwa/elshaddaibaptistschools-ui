import React from "react";
import { motion } from "framer-motion";

const Facilities = () => {
  return (
    <div className="w-full bg-white py-16 lg:py-24 border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-bold uppercase tracking-wider text-sm">
            Campus Life
          </span>
          <h2 className="text-secondary text-3xl md:text-4xl font-black leading-tight mt-2">
            State-of-The-Art Facilities
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We invest in the best infrastructure to support your child's
            learning journey, providing a world-class environment right here in
            Lagos.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              title: "Modern Library",
              desc: "Over 10,000 resources for research and study.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDr9bXxPga9MlMOF061vhfj2825e5vZbdlIJkkCpmM8FscZoUh4kI4xhvJMLeur8q4q9Y1HS7u307ZQnkfFVmaTn8W5zHjQ2lNntHsmc0Hg2exoBCCFpyQEsRkAewgWh03B8LlfrFviiIGmOP8fkZg6WkULKe1CK1b1pv_pNbqHzPl4cYFipm8LFEm7WbNwmyUeIUqxN-hdK9_G-7I_slfdCN_baCTVlR8Iv_LxiNLH5pqRU_Zat_ViYXASgGw6sK59hQlJ5FepTQ",
              alt: "Modern Library with shelves of books",
            },
            {
              title: "Science Lab",
              desc: "Fully equipped Physics, Chemistry & Biology stations.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3OSU_4ZJmtAEk0ukZp5oV6MsczT8Oq4OfDKoO4279f7vFvR85ozkcvFtwpT7eYL4z4mLy2Iyt1PHolp6IjSNotE5XYJT00zHTZdM7ikjNCqavwSpsXHvSLAAf8zq0Fokz8K0nxqP2OBkyTdrmC6j6QYfia5LqvGMEz_AMfgXUKalMkwscnlbzUykFytZqVYawWBdTSRrT9BRNQDDXPMNkwSnDED-PEqAIUuEvLRx2FhbW2Un6p0M4ud3kMc4Mgwg4p_tBEegprw",
              alt: "Science Lab with students performing experiments",
            },
            {
              title: "ICT Center",
              desc: "High-speed internet and coding workshops.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5RKekcrgDUlDCtjwmHATDdnkUzfYr_3tVVQFoGwelzRbCVsWb8R_JL04PK3yRG9XAwG51E4On_sa7ifcxT7F7ZSbN2JPOBLhiC4BJtqngZRB6wsbr8v0a2VUydqrbNA1QjZxL2lYMecQufBvr6CP_RjhC31S2wzFHUUq-MPSlnpHItdgsFxsFYKfEjFhlPfDyGG_2KVmXoQToV5i4e3CDHvd1OHRd0magsSUeDZso5hhliU5tllUTomRjcQKReVx00tULB42iEQ",
              alt: "ICT Center with computers",
            },
            {
              title: "Sports Complex",
              desc: "Football pitch, basketball courts, and track.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEEAZfjfO-BiLuFu2J9A1uUrHl9NOjRRfF67pXapJUz8CRMKNzD6zkXKD7tHIKAHfLM0VGxeHnJCzN02nZxql2-ACi3B1oWSUUufeVryRfr4RpWTD83eJ71E_s6gncMHKh9bTy4GzRCvluyZcCLPgMEQPMTwv846fLExgo4mK4wubI92ap6U7kZ6gHaTZbSmRGZWtX5dZiS4tNagTh8hCb7l_2MG2nRNeUIU6wARip4l0NO9QItUoawmkOOygF-jUHkRLrUrNO2A",
              alt: "Sports Complex field",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-gray-200">
                <img
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={item.img}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="text-white font-bold text-xl mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-200 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Facilities;
