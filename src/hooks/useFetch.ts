import { supabase } from "../lib/supabase";

export const fetchHistory = async () => {
  const { data, error } = await supabase
    .from("history")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching history:", error);
    return [];
  }

  return data;
};
