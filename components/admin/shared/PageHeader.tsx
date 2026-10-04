import React from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, action }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h1 className="text-secondary text-2xl font-black tracking-tight">
          {title}
        </h1>
        <p className="text-gray-400 text-sm mt-1">{description}</p>
      </div>
      {action}
    </div>
  );
};

export default PageHeader;
