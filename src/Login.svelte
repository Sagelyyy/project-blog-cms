<script>
  import { userStore } from "./store";
  let email = "";
  let password = "";

  async function handleLogin() {
    try {
      const res = await fetch(
        "https://project-blog-production.up.railway.app/api/users",
        {
          method: "POST",
          withCredentials: true,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      let data = await res.json();
      userStore.set(data);
    } catch (err) {
      console.log(err);
    }
  }
</script>

<h1>Login:</h1>
<form
  method="POST"
  action="https://project-blog-production.up.railway.app/api/users"
>
  <input type="text" name="email" bind:value={email} />
  <input type="password" name="password" bind:value={password} />
  <button on:click|preventDefault={() => handleLogin()}>Submit</button>
</form>
