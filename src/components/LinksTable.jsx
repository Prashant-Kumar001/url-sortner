import React from "react";
import LinkRow from "./LinkRow";

const LinksTable = ({ links, clickMap }) => {
  return (
    <div className="hidden md:block rounded-2xl border overflow-hidden bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Short</th>
            <th className="p-4 text-left">Original</th>
            <th className="p-4 text-center">Clicks</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 text-center">Created</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {links.map((link) => (
            <LinkRow
              key={link.id}
              link={link}
              clicks={clickMap[link.id] || 0}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LinksTable;
