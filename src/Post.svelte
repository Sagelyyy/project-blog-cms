<script>
  import { fade } from "svelte/transition";
  import Editor from "@tinymce/tinymce-svelte";
  import RollTable from "./Roll-Table.svelte";

  let postError = "";
  let postTitle = "";
  let postText = "";
  let status = "";
  let randNumber = 0;

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
            status: status,
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
      {#if randNumber !== 0}
        <input
          transition:fade
          placeholder="Title"
          type="text"
          name="title"
          id="postTitle"
          bind:value={postTitle}
          required
        />
        <select name="status" bind:value={status}>
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
        <button
          transition:fade
          class="btn"
          on:click|preventDefault={() => handlePost()}>Submit</button
        >
      {/if}
      {#if randNumber === 0}
        <button class="btn" on:click|preventDefault={() => handleRoll()}>
          Roll D20
        </button>
      {/if}
    </form>
  </div>
  <RollTable />
</div>

<style>
  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  @media (min-width: 768px) {
    .content {
      margin: 0 auto;
      margin-top: 75px;
      display: grid;
      grid-template-columns: minmax(300px, 900px) 500px;
      justify-content: center;
    }
  }

  .container {
    background-color: var(--accent);
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
