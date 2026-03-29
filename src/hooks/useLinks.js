import { useCallback, useEffect, useMemo, useState } from "react";
import { getUrls } from "@/api/urlsApi";
import { getClicksForUrl } from "@/api/clicks";
import { useAuth } from "@/context/AuthContext";

export const useLinks = () => {
  const { data } = useAuth();

  const [links, setLinks] = useState([]);
  const [clicks, setClicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!data?.session?.user?.id) return;

    try {
      setLoading(true);

      const urls = await getUrls(data.session.user.id);

      if (!urls?.length) {
        setLinks([]);
        return;
      }

      const urlIds = urls.map((u) => u.id);
      const clicksData = await getClicksForUrl(urlIds);

      setLinks(urls);
      setClicks(clicksData);
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const clickMap = useMemo(() => {
    const map = {};
    clicks.forEach((c) => {
      map[c.url_id] = (map[c.url_id] || 0) + 1;
    });
    return map;
  }, [clicks]);

  const totalClicks = useMemo(() => {
    return Object.values(clickMap).reduce((a, b) => a + b, 0);
  }, [clickMap]);

  return {
    links,
    clickMap,
    totalClicks,
    clicks,
    loading,
    error,
    refetch: fetchData,
  };
};
