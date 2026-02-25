import supabase from "./supabase.js";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return cabins;
}

export async function deleteCabin(cabinId) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", cabinId);
  if (error) {
    console.error(error.message);
    throw new Error(`Failed to delete data of id ${cabinId}`);
  }
  return data;
}

export async function createCabin(newCabin) {
  const {data, error} = await supabase.from("cabins").insert([newCabin]).select()
  if (error) {
    console.error(error.message);
    throw new Error(`Cabin could not be created`);
  }
  return data;
}