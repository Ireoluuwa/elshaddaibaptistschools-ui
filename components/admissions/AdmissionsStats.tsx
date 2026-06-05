import { admissionsStats } from "@/constants/admissions";

const AdmissionsStats = () => {
  return (
    <div className="w-full bg-primary">
      <div className="max-w-5xl mx-auto px-6 lg:px-20 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {admissionsStats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-white text-3xl md:text-4xl font-black">{stat.value}</span>
            <span className="text-green-200 text-sm font-medium uppercase tracking-wide">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdmissionsStats;
