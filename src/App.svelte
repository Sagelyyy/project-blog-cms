<script>
  import Login from "./Login.svelte";
  import Post from "./Post.svelte";
  import { userStore } from "./store";
</script>

<svelte:head>
  <title>LoTJ Dice Roll CMS</title>
</svelte:head>

<main>
  {#if $userStore}
    <h1>Welcome, {$userStore.user.email.split("@")[0]}</h1>
    <Post />
  {:else}
    <Login />
  {/if}
</main>

<style>
  :global(:root) {
    --primary-bg: #364652;
    --darker-hlight: #bfb1c1;
    --lighter-hlight: #b5bec6;
    --highlight: #c7dbe6;
    --error: #8e3b46;
  }

  :global(body) {
    background-color: var(--primary-bg);
  }

  :global(.error) {
    color: var(--error) !important;
  }

  h1 {
    text-transform: capitalize;
    width: fit-content;
    margin: 0 auto;
    color: var(--highlight);
  }
</style>
