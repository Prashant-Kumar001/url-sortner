import supabase, { supabaseUrl } from "@/utils/supabase";
import { UAParser } from "ua-parser-js";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("url")
    .select("*")
    .eq("user_id", user_id);
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteUrl(url_id) {
  const { error } = await supabase.from("url").delete().eq("id", url_id);
  if (error) throw new Error(error.message);
  return true;
}

export async function createLink(
  { title, longUrl, customUrl, user_id },
  qrCode,
) {
  const short_url = Math.random().toString(36).substring(2, 10);
  const fileName = `qr-${short_url}-${user_id}`;

  const { error: uploadError } = await supabase.storage
    .from("Qr_code")
    .upload(fileName, qrCode);

  if (uploadError) throw new Error(uploadError.message);

  const qr = `${supabaseUrl}/storage/v1/object/public/Qr_code/${fileName}`;

  const { data, error } = await supabase
    .from("url")
    .insert({
      title,
      original_url: longUrl,
      short_url: short_url,
      custom_url: customUrl ?? null,
      user_id,
      qr_code: qr,
    })
    .select();
  if (error) throw new Error(error.message);
  return data;
}

export async function getLink(link_id) {
  const { data, error } = await supabase
    .from("url")
    .select("id, original_url")
    .or(`short_url.eq.${link_id}, custom_url.eq.${link_id}`)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

const parser = new UAParser();



export async function storeClicks({ url_id, original_url }) {
  try {
    const res = parser.getResult();
    const device = res.device.type || "desktop";
    // https://api.ipify.org?format=json
      const response = await fetch("https://ipapi.co/json");
    const { city, country_name } = await response.json();
    await supabase
      .from("clicks")
      .insert({ url_id, device, city, country: country_name });

    window.open(original_url, "_blank");
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
