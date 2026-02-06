
import { supabase } from "./supabaseClient";

export async function getSiteConfig() {
  const { data, error } = await supabase
    .from("site_config")
    .select("key, value");
  
  if (error) {
    console.error("Error fetching site config:", error);
    return {};
  }

  // Convert array to object { key: value }
  return data.reduce((acc: any, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
}
