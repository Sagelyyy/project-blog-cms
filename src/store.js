import { writable } from "svelte/store";

async function getUser() {
  const res = await fetch(
    "https://project-blog-production.up.railway.app/api/users/me",
    {
      method: "GET",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    const user = await res.json();
    return user;
  } else {
    return null;
  }
}

export const userStore = writable(null);

getUser().then((data) => userStore.set(data));

export const postStore = writable(null);
