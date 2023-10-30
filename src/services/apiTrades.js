import supabase from "./supabase";

export async function getTrades() {
  const { data: trades, error } = await supabase.from("trades").select("*");

  if (error) {
    console.error(error);
    throw new Error("Trades could not be loaded");
  }

  return trades;
}

export async function deleteTrade(id) {
  const { data, error } = await supabase.from("trades").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Trade could not be deleted");
  }

  return data;
}
