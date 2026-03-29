import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useLinks } from "@/hooks/useLinks";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Link = () => {
  const { id } = useParams();
  const { clicks, links } = useLinks();

  const { link, clicksForLink } = useMemo(() => {
    const foundLink = links.find((l) => String(l.id) === String(id));
    const relatedClicks = clicks.filter((c) => String(c.url_id) === String(id));

    return {
      link: foundLink,
      clicksForLink: relatedClicks,
    };
  }, [id, links, clicks]);

  const totalClicks = clicksForLink.length;

  const deviceStats = clicksForLink.reduce((acc, click) => {
    acc[click.device] = (acc[click.device] || 0) + 1;
    return acc;
  }, {});

  const cityStats = clicksForLink.reduce((acc, click) => {
    const city = click.city?.trim().toLowerCase();
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  if (!link) return <div className="p-6">Link not found</div>;

  return (
    <div className="p-6 space-y-6">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">🔗 {link.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-500">
            Original:{" "}
            <a href={link.original_url} className="text-blue-500 underline">
              {link.original_url}
            </a>
          </p>
          <p className="text-sm text-gray-500">
            Short:{" "}
            <a href={link.short_url} className="text-green-500 underline">
              {link.short_url}
            </a>
          </p>
          <p className="text-sm text-gray-400">
            Created: {new Date(link.created_at).toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="rounded-2xl">
          <CardContent className="p-6 text-center">
            <p className="text-gray-500 text-sm">Total Clicks</p>
            <h2 className="text-3xl font-bold">{totalClicks}</h2>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <p className="text-gray-500 text-sm mb-2">Devices</p>
            {Object.entries(deviceStats).map(([device, count]) => (
              <div key={device} className="flex justify-between">
                <span>{device}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <p className="text-gray-500 text-sm mb-2">Top Cities</p>
            {Object.entries(cityStats).map(([city, count]) => (
              <div key={city} className="flex justify-between">
                <span className="capitalize">{city}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>📊 Recent Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-500 border-b">
                <tr>
                  <th className="text-left py-2">City</th>
                  <th className="text-left py-2">Device</th>
                  <th className="text-left py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {clicksForLink.map((click) => (
                  <tr key={click.id} className="border-b">
                    <td className="py-2 capitalize">{click.city?.trim()}</td>
                    <td className="py-2">{click.device}</td>
                    <td className="py-2">
                      {new Date(click.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {clicksForLink.length === 0 && (
              <p className="text-center text-gray-400 py-4">No clicks yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Link;
