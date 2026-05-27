import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Trash } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLinks } from "@/hooks/useLinks";
import { toast } from "sonner";
import { createLink, deleteUrl } from "@/api/urlsApi";
import { BarLoader } from "react-spinners";
import CreateLink from "@/components/CreateLink";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { data} = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("url");

  const ref = React.useRef(null);
  const [title, setUrlTitle] = React.useState("");
  const [longUrl, setLongUrl] = React.useState("");
  const [customAlias, setCustomAlias] = React.useState(null);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [loadingDelete, setLoadingDelete] = React.useState(false);

  const {
    links = [],
    clickMap = {},
    loading: linkLoading,
    error: linkError,
    refetch,
  } = useLinks();

  useEffect(() => {
    if (longLink) {
      setLongUrl(longLink || "");
    }
  }, [longLink]);

  const handleCreate = async () => {
    const id = data?.session?.user?.id;

    if (!longUrl) return toast.error("Please enter a URL");
    if (!title) return toast.error("Please enter a title");
    if (!id) return toast.error("Please login");

    if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
      return toast.error("Please enter a valid URL");
    }

    if (customAlias && customAlias.includes("http")) {
      return toast.error("Custom alias should not be a full URL");
    }

    if (loading) return;

    try {
      setLoading(true);
      setError(null);

      const canvas = ref.current?.canvasRef?.current;

      if (!canvas) {
        throw new Error("Canvas not found");
      }

      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Failed to create blob"));
        });
      });

      const payload = {
        title,
        longUrl,
        customUrl: customAlias?.trim() || null,
        user_id: id,
        qrCode: blob,
      };

      const res = await createLink(payload, blob);
      if (!res) return toast.error("Failed to create link");
      console.log(res);
      toast.success("Link created successfully");
      refetch();
      setLongUrl("");
      setCustomAlias("");
      setUrlTitle("");
      navigate(`/links/${res[0].id}`);
    } catch (err) {
      console.log(err);
      setError("Failed to create link");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("Copied!");
  };

  const handleDelete = async (id) => {
    try {
      setLoadingDelete(true);
      await deleteUrl(id);
      toast.success("Deleted");
      refetch();
    } catch (err) {
      toast.error(err.message || "Delete failed");
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {loadingDelete || linkLoading  && (
        <div className="fixed w-full h-full bg-black left-0 top-0 opacity-50 z-50 ">
          <BarLoader width="100%" color="#36d7b7" />
        </div>
      )}
      <CreateLink
        longUrl={longUrl}
        setLongUrl={setLongUrl}
        customAlias={customAlias}
        setCustomAlias={setCustomAlias}
        handleCreate={handleCreate}
        loading={loading}
        error={error}
        title={title}
        ref={ref}
        setUrlTitle={setUrlTitle}
      />

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Your Links</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {linkLoading && (
            <p className="text-sm text-muted-foreground text-center">
              Loading links...
            </p>
          )}

          {linkError && (
            <p className="text-sm text-red-500 text-center">
              Failed to load links
            </p>
          )}

          {!linkLoading && links.length === 0 && (
            <p className="text-sm text-muted-foreground text-center">
              No links yet. Create one 🚀
            </p>
          )}

          {links.map((link) => (
            <div
              key={link.id}
              className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/50 transition"
            >
              <img
                src={link.qr_code}
                alt="qr"
                className="w-52 h-52 rounded-md border object-cover"
              />

              <div className="flex-1 ml-4 space-y-1">
                <p className="text-sm text-muted-foreground truncate max-w-75">
                  {link.original_url}
                </p>

                <p className="font-medium text-primary truncate">
                  {`https://domain.com/${link.custom_url ? link.custom_url : link.short_url}`}
                </p>

                <p className="text-xs text-muted-foreground">
                  {clickMap?.[link.id] || 0} clicks
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleCopy(link.short_url)}
                >
                  <Copy size={16} />
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(link.id)}
                >
                  <Trash size={16} />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
