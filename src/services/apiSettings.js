import supabase from "./supabase";

export async function getSettings(id) {
  const { data: trade, error } = await supabase
    .from("settings")
    .select("*")
    .eq("userId", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return trade;
}

export async function updateSetting(arr) {
  const [newSetting, id] = arr;

  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("userId", id)
    .single();

  if (error) {
    throw new Error("Settings could not be updated");
  }

  return data;
}

export async function createSettings(newSettings) {
  const { data, error } = await supabase.from("settings").insert([newSettings]);

  if (error) {
    throw new Error("Settings could not be created");
  }

  return data;
}
