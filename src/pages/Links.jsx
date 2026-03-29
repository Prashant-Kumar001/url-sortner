import React, { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";

import StatsCards from "@/components/StatsCards";
import LinksTable from "@/components/LinksTable";
import MobileLinkCard from "@/components/MobileLinkCard";
import ClicksChart from "@/components/ClicksChart";
import DeviceChart from "@/components/DeviceChart";

import { useLinks } from "@/hooks/useLinks";

const LinksPage = () => {
  const { clicks, links, clickMap, totalClicks, loading, error } = useLinks();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  const filteredLinks = useMemo(() => {
    if (!debouncedSearch) return links;

    return links.filter((link) =>
      `${link.title} ${link.original_url} ${link.short_url}`
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch, links]);

  if (error) return <div>{error.message}</div>;

  return (
    <div className="space-y-6">
      <BarLoader width="100%" loading={loading} color="#36d7b7" />

      <input
        type="text"
        placeholder="Search links..."
        className="w-full md:w-80 px-3 py-2 rounded-lg border bg-background"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button>Create New</Button>
      </div>

      <StatsCards links={links} totalClicks={totalClicks} />

      <LinksTable links={filteredLinks} clickMap={clickMap} />

      <div className="grid md:grid-cols-2 gap-4 items-stretch">
        <ClicksChart clicks={clicks} />
        <DeviceChart clicks={clicks} />
      </div>

      <div className="md:hidden space-y-3">
        {filteredLinks.map((link) => (
          <MobileLinkCard
            key={link.id}
            link={link}
            clicks={clickMap[link.id] || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default LinksPage;
