import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Trash2, ExternalLink, CopyIcon, Download } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { BeatLoader, DotLoader } from "react-spinners";
import { deleteUrl } from "@/api/urlsApi";

const LinkRow = ({ link, clicks, refetch }) => {
  const [loading, setLoading] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(link.short_url);
    toast.success("Copied!");
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteUrl(link.id);
      if (!res) return;
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
      await refetch();
    }
  };

  // const handleDownload = async () => {

  // };

  return (
    <tr className={`border-t hover:bg-muted/50`}>
      <td className="p-4">
        <Link to={`/links/${link.id}`}>{link.title}</Link>
      </td>

      <td className="p-4 text-indigo-500 flex items-center gap-1 hover:text-blue-600">
        {link.custom_url ? link.custom_url : link.short_url}
        <a
          href={`http://localhost:5173/${link.custom_url ? link.custom_url : link.short_url}`}
          target="_blank"
        >
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

        <Button
          onClick={handleDelete}
          size="icon"
          variant="ghost"
          disabled={loading}
        >
          {loading ? (
            <DotLoader size={16} />
          ) : (
            <Trash2 size={16} className="text-red-500" />
          )}
        </Button>
        {/* <Button
            onClick={handleDownload}
            size="icon"
            variant="ghost"
            disabled={loading}
          >
           <Download size={16} />
          </Button> */}
      </td>
    </tr>
  );
};

export default LinkRow;
