import supabase from "./supabase.js";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function updateCurrentUser({password, fullName, avatar}) {
//     1. Update the password or the full name
  let updateData;
  if(password) updateData = {password}
  if(fullName) updateData = {data:{fullName}}
  const {data,error:updateError} = await supabase.auth.updateUser(updateData)
  if(updateError) throw new Error(updateError.message)
  if(!avatar) return data;
//   2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`

  const {error: storageError} = await supabase.storage.from('avatars').upload(fileName, avatar)
  if(storageError) throw new Error(storageError.message)

//   3. Get the public URL of the uploaded avatar
  const {data:{publicUrl}} = await supabase.storage.from("avatars").getPublicUrl(fileName)

//  4. update the avatar in the user
  const {data:updatedUser, error} = await supabase.auth.updateUser({data: {avatar: publicUrl}})

  if (error) throw new Error(error.message);

  return updatedUser;
}
