<script>
  let postError = "";
  let postTitle = "";
  let postText = "";
  let randNumber = 0;

  async function handlePost() {
    if (randNumber !== 0) {
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

<h1>Post:</h1>
<form method="POST" action="http://localhost:3000/api/blogs">
  <input type="text" name="title" id="postTitle" bind:value={postTitle} />
  <textarea
    name="text"
    id="postText"
    cols="30"
    rows="10"
    bind:value={postText}
  />
  <input type="number" name="number" disabled bind:value={randNumber} />
  <button on:click|preventDefault={() => handleRoll()}>Roll D20</button>
  <button on:click|preventDefault={() => handlePost()}>Submit</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
  }
</style>
