import supabase from "./supabase";

export async function getTrades() {
  // GET TRADES
  const { data: trades, error } = await supabase.from("trades").select("*");

  if (error) {
    console.error(error);
    throw new Error("Trades could not be loaded");
  }

  return trades;
}

export async function createTrade(newTrade) {
  // https://tocnvuzfmuymgykvcodp.supabase.co/storage/v1/object/public/trade-images/GBPUSD_2023-11-01_13-30-50.png

  // CREATE TRADE
  const { data, error } = await supabase.from("trades").insert([newTrade]);

  if (error) {
    console.error(error);
    throw new Error("Trade could not be created");
  }

  // UPLOAD IMAGE

  return data;
}

export async function deleteTrade(id) {
  // DELETE TRADE
  const { data, error } = await supabase.from("trades").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Trade could not be deleted");
  }

  return data;
}
