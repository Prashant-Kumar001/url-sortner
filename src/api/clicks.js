import supabase from "@/utils/supabase";

export async function getClicksForUrl(urlIds) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);
  if (error) throw new Error(error.message);
  return data;
}
