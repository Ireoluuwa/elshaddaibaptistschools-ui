import React from "react";
import { School, Users, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <div className="w-full bg-bg-accent-subtle/30 py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 lg:px-20 flex flex-col gap-12"
      >
        <div className="flex flex-col gap-4 text-center md:text-left md:flex-row md:justify-between md:items-end">
          <div className="flex flex-col gap-2">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">
              Why Choose Us
            </span>
            <h2 className="text-secondary text-3xl md:text-4xl font-black leading-tight tracking-tight">
              Our Core Values
            </h2>
          </div>
          <p className="text-gray-600 text-base max-w-md">
            We are dedicated to providing a holistic education that balances
            academic rigor with moral integrity and community service.
          </p>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: <School size={28} />,
              title: "Academic Excellence",
              desc: "Our curriculum is designed to challenge students and foster critical thinking, preparing them for top universities locally and abroad.",
            },
            {
              icon: <Users size={28} />,
              title: "Moral Integrity",
              desc: "We build strong character through discipline and guidance, ensuring our students become responsible citizens of Nigeria.",
            },
            {
              icon: <Trophy size={28} />,
              title: "Sports & Creativity",
              desc: "Beyond the classroom, we nurture talents in arts, music, and athletics, fostering a well-rounded development.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="group flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="size-12 rounded-full bg-accent flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-secondary text-xl font-bold">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Features;
