import { getLink, storeClicks } from "@/api/urlsApi";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";

const Redirect = () => {
  const { id } = useParams();

  useEffect(() => {
    const redirect = async () => {
      try {
        const res = await getLink(id);

        const originalUrl = res?.original_url;

        if (!originalUrl) {
          throw new Error("Link not found");
        }

        storeClicks({
          url_id: res?.id,
          original_url: res?.original_url,
        }).catch(() => {});
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Redirect failed");
      }
    };

    if (id) redirect();
  }, [id]);

  return <BarLoader width={"100%"} color="#22c55e" />;
};

export default Redirect;
