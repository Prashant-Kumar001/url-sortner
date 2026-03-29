import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const LinkRow = ({ link, clicks }) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(link.short_url);
    toast.success("Copied!");
  };

  return (
    <tr className="border-t hover:bg-muted/50">
      <td className="p-4">
        <Link to={`/links/${link.id}`}>{link.title}</Link>
      </td>

      <td className="p-4 text-indigo-600 flex items-center gap-1">
        {link.short_url}
        <a href={link.short_url} target="_blank">
          <ExternalLink size={14} />
        </a>
      </td>

      <td className="p-4 truncate max-w-50">{link.original_url}</td>

      <td className="p-4 text-center font-semibold">{clicks}</td>

      <td className="p-4 text-center">
        <Badge variant={link.status ? "default" : "secondary"}>
          {link.status ? "active" : "inactive"}
        </Badge>
      </td>

      <td className="p-4 text-center">
        {new Date(link.created_at).toLocaleDateString()}
      </td>

      <td className="p-4 flex justify-end gap-2">
        <Button size="icon" variant="ghost" onClick={handleCopy}>
          <Copy size={16} />
        </Button>

        <Button size="icon" variant="ghost">
          <Trash2 size={16} className="text-red-500" />
        </Button>
      </td>
    </tr>
  );
};

export default LinkRow;
