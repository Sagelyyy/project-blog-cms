<script>
  import { fade } from "svelte/transition";
  import Editor from "@tinymce/tinymce-svelte";
  import { postStore } from "./store";

  let postError = "";
  let postTitle = "";
  let postText = "";
  let postStatus = "";
  let postId = "";
  let randNumber = 0;

  function clearPost() {
    postError = "";
    postTitle = "";
    postText = "";
    postStatus = "";
    postId = "";
    randNumber = 0;
    postStore.set(null);
  }

  function setPost() {
    postId = $postStore.id;
    postStatus = $postStore.status;
    randNumber = $postStore.roll;
    postTitle = $postStore.title;
    postText = $postStore.text;
  }

  async function handlePost() {
    if (randNumber !== 0) {
      if (postTitle !== "" || postText !== "") {
        fetch("https://project-blog-production.up.railway.app/api/blogs", {
          method: "POST",
          withCredentials: true,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: postTitle,
            text: postText,
            status: postStatus,
            number: randNumber,
          }),
        })
          .then((res) => {
            postText = "";
            postTitle = "";
            randNumber = 0;
          })
          .catch((e) => console.log(e));
        postError = "";
      } else {
        postError = "Fill in the required fields";
      }
    } else {
      postError = "You must roll the D20";
    }
  }

  function roll() {
    return Math.floor(Math.random() * 19) + 1;
  }

  function handleRoll() {
    randNumber = roll();
  }

  async function handleUpdate(id) {
    try {
      const res = await fetch(
        `https://project-blog-production.up.railway.app/api/blogs/${id}`,
        {
          method: "PUT",
          withCredentials: true,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            title: postTitle,
            text: postText,
            status: postStatus,
            number: randNumber,
          }),
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      clearPost();
    }
  }
</script>

{#if postError}
  <div class="container">
    <h2 class="text-basic">Could not post:</h2>
    <h3 class="error text-basic">{postError}</h3>
  </div>
{/if}

<div class="content">
  <div class="container">
    <h3 class="text-basic">Post:</h3>
    <form
      method="POST"
      action="https://project-blog-production.up.railway.app/api/blogs"
    >
      <input type="number" name="number" disabled bind:value={randNumber} />
      {#if randNumber !== 0 || $postStore}
        <input
          transition:fade
          placeholder="Title"
          type="text"
          name="title"
          id="postTitle"
          bind:value={postTitle}
          required
        />
        <select name="status" bind:value={postStatus}>
          <option value="unpublished" selected>Unpublished</option>
          <option value="published">Published</option>
        </select>
        <Editor
          required
          name="text"
          id="postText"
          placeholder="What did you do?"
          bind:value={postText}
          apiKey={TINYMCE}
        />
        {#if !$postStore}
          <button
            transition:fade
            class="btn"
            on:click|preventDefault={() => handlePost()}>Submit</button
          >
        {:else}
          <button
            transition:fade
            class="btn"
            on:click|preventDefault={() => handleUpdate($postStore.id)}
            >Submit Update</button
          >
        {/if}
      {/if}
      {#if randNumber === 0 && !$postStore}
        <button class="btn" on:click|preventDefault={() => handleRoll()}>
          Roll D20
        </button>
      {:else}
        <button class="btn" on:click|preventDefault={() => setPost()}>
          Open to update
        </button>
      {/if}
    </form>
  </div>
</div>

<style>
  .content {
    max-width: 900px;
    flex-grow: 2;
  }
  .container {
    background-color: var(--accent);
    padding: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  input,
  textarea {
    transition: all 0.5s;
  }

  input:disabled {
    color: darkred;
  }

  input:hover,
  textarea:hover {
    box-shadow: 5px 5px 13px black;
  }

  .text-basic {
    margin: 0 auto;
    width: fit-content;
    color: black;
    align-self: flex-start;
  }

  .btn {
    align-self: center;
    width: 300px;
    border: none;
    background-color: var(--darker-hlight);
    border-radius: 5px;
    color: var(--darker-hlght);
    transition: all 0.5s;
  }

  .btn:hover {
    cursor: pointer;
    background-color: rgb(94, 179, 94);
    box-shadow: 5px 5px 13px black;
  }
</style>
