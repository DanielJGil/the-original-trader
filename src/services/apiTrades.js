import supabase from "./supabase";

export async function getTrades() {
  const { data: trades, error } = await supabase.from("trades").select("*");

  if (error) {
    console.error(error);
    throw new Error("Trades could not be loaded");
  }

  return trades;
}
