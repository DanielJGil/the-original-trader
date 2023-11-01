import supabase, { supabaseUrl } from "./supabase";

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
  const imageName = `${Math.random()}-${newTrade.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/trade-images/${imageName}`;

  // CREATE TRADE
  const { data, error } = await supabase
    .from("trades")
    .insert([{ ...newTrade, image: imagePath }]);

  if (error) {
    console.error(error);
    throw new Error("Trade could not be created");
  }

  // UPLOAD IMAGE
  const { error: storageError } = await supabase.storage
    .from("trade-images")
    .upload(imageName, newTrade.image);

  // DELETE TRADE IF THERE WAS AN ERROR UPLOADING IMAGE
  if (storageError) {
    await supabase.from("trades").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Trade image could not be uploaded and the trade was not created"
    );
  }

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
