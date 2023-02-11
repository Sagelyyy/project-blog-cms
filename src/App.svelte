<script>
  import Login from "./Login.svelte";
  import Post from "./Post.svelte";
  import { userStore } from "./store";
</script>

<main>
  {#if $userStore}
    {$userStore.user.email}
    <Post />
  {:else}
    <Login />
  {/if}
</main>
