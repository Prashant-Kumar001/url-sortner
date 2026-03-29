import React from "react";

const StatsCards = ({ links, totalClicks }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card title="Total Links" value={links.length} />
      <Card title="Total Clicks" value={totalClicks} />
      <Card title="Active Links" value={links.filter((l) => l.status).length} />
      <Card title="Inactive" value={links.filter((l) => !l.status).length} />
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="p-4 rounded-2xl border bg-card shadow-sm">
    <p className="text-sm text-muted-foreground">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

export default StatsCards;
