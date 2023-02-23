<script>
  import { fade } from "svelte/transition";
  let postError = "";
  let postTitle = "";
  let postText = "";
  let randNumber = 0;

  async function handlePost() {
    if (randNumber !== 0) {
      if (postTitle !== "" || postText !== "") {
        fetch("http://localhost:3000/api/blogs", {
          method: "POST",
          withCredentials: true,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: postTitle,
            text: postText,
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
    <form method="POST" action="http://localhost:3000/api/blogs">
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
        <textarea
          transition:fade
          placeholder="What did you do?"
          name="text"
          id="postText"
          cols="30"
          rows="10"
          bind:value={postText}
          required
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
  <div transition:fade class="container">
    <h3 class="text-basic">Decision making table:</h3>
    <ul>
      <li>1: Do something incredibly stupid</li>
      <li>2-3: Act recklessly and take dangerous risks</li>
      <li>4-6: Act impulsively and make a hasty decision</li>
      <li>7-9: Act on a whim, regardless of consequences</li>
      <li>10-12: Let emotions guide your actions</li>
      <li>13-15: Consider short-term gains over long-term consequences</li>
      <li>16-18: Take a cautious approach, weigh the options before acting</li>
      <li>19: Make a rational, well-thought-out decision</li>
      <li>20: Do what you want to do.</li>
    </ul>
  </div>
</div>

<style>
  .content {
    margin-top: 75px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  form {
    display: flex;
    flex-direction: column;
    min-width: 800px;
    max-height: 400px;
    align-self: center;
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

  .container {
    margin: 0 auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 20px;
    justify-content: center;
    max-height: 500px;
  }
</style>
