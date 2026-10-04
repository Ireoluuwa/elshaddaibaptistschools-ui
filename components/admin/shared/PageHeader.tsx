import React from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, action }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-6 border-b border-line">
      <div>
        <h1 className="text-ink text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted text-sm mt-1">{description}</p>
      </div>
      {action}
    </div>
  );
};

export default PageHeader;
