import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";

const MobileLinkCard = ({ link, clicks }) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(link.short_url);
    toast.success("Copied!");
  };

  return (
    <div className="border rounded-xl p-4 space-y-3 bg-card">
      <div className="flex justify-between">
        <span className="text-indigo-600">{link.short_url}</span>
        <Button size="icon" variant="ghost" onClick={handleCopy}>
          <Copy size={16} />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground truncate">
        {link.original_url}
      </p>

      <div className="flex justify-between">
        <span>{clicks} clicks</span>
        <Badge variant={link.status ? "default" : "secondary"}>
          {link.status ? "active" : "inactive"}
        </Badge>
      </div>

      <div className="flex justify-between text-xs">
        <span>{new Date(link.created_at).toLocaleDateString()}</span>

        <Button size="icon" variant="ghost">
          <Trash2 size={16} className="text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default MobileLinkCard;
