<script>
  import { userStore, postStore } from "./store";

  function setpostStore({ data }) {
    postStore.set({ data });
    console.log($postStore);
  }

  async function getBlogs() {
    try {
      const res = await fetch(
        "https://project-blog-production.up.railway.app/api/blogs",
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
        const blogs = await res.json();
        return blogs;
      }
    } catch (err) {
      console.log(err);
    }
  }

  let blogs = getBlogs();

  async function handleDelete(id) {
    try {
      const res = await fetch(
        `https://project-blog-production.up.railway.app/api/blogs/${id}`,
        {
          method: "DELETE",
          withCredentials: true,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      location.reload();
    }
  }
</script>

<div class="content">
  {#await blogs}
    ...loading
  {:then data}
    {#each data.blogs as item}
      <div class="card">
        <div class="roll">
          <h3><span>{item.user.username}</span> rolled a</h3>
          <h2>{item.number}</h2>
        </div>
        <div class="post">
          <h1>{item.title}</h1>
          {#if item.status == "published"}
            <h3 class="published">{item.status}</h3>
          {:else}
            <h3 class="unpublished">{item.status}</h3>
          {/if}
          <h2>{item.user.username}</h2>
          <div class="separator" />
          <p>{@html item.text}</p>
          <div class="footer">
            <p>Posted at {item.date}</p>
            <div>
              <button
                on:click|preventDefault={function () {
                  let data = {
                    id: item._id,
                    status: item.status,
                    roll: item.roll,
                    title: item.title,
                    text: item.text,
                  };
                  setpostStore(data);
                }}
              >
                <span class="material-symbols-outlined"> edit </span>
              </button>
            </div>
            {#if $userStore !== null && $userStore.user.admin}
              <form
                method="POST"
                action="https://project-blog-production.up.railway.app/api/blogs"
              >
                <input name="id" value={item._id} hidden required />
                <button on:click|preventDefault={() => handleDelete(item._id)}>
                  <span class="material-symbols-outlined trash"> delete </span>
                </button>
              </form>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  {/await}
</div>

<style>
  .content {
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-direction: column;
    max-width: 600px;
    padding: 10px;
  }
  .footer > div > button,
  form > button {
    width: fit-content;
    height: 40px;
  }
</style>
