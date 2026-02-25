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

export async function createEditCabin(newCabin, id) {
  console.log(id);
  if (typeof id !== "number") id = null;
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const hasImagePath = newCabin.image?.startsWith?.(SUPABASE_URL);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create a new cabin
  let query = supabase.from("cabins");

  // A) Create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]).select();
  }
  // B) Edit
  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select()
      .single();
  }

  const { data, error } = await query;

  if (error) {
    console.error(error.message);
    throw new Error(`Cabin could not be created`);
  }
  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading the corresponding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError.message);
    throw new Error(
      `Cabin image could not be uploaded and the cabin could not be created.`,
    );
  }
  return data;
}
