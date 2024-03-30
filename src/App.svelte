<script>
  import { onMount } from "svelte"
  import { isNil } from "lodash-es"

  import { filter_profiles } from "./lib/utils"
  import Board from "./Board.svelte"

  let ALL_PROFILES = []

  let search = ""
  $: profiles = filter_profiles(search, ALL_PROFILES)

  onMount(() => {
    const github_url = "https://api.github.com/orgs/mozilla/members?page=1"
    fetch(github_url)
      .then(resp => {
        return resp.json()
      })
      .then(users => {
        ALL_PROFILES = users.map(p => ({
          id: p.id,
          name: p.login,
          url: p.html_url,
          image_url: p.avatar_url,
        }))
      })
  })
</script>

<main class="holder">
  {#if isNil(profiles)}
    <div>{"Loading ..."}</div>
  {:else}
    <div class="board">
      <Board {profiles} />
    </div>
    <div class="sidebar">
      <input bind:value={search} placeholder="Search members ..." />
    </div>
  {/if}
</main>

<style>
  .holder {
    height: 90%;
    margin: 2rem;

    display: flex;
    flex-direction: row;

    border: thin solid #aaf;
  }

  .board {
    width: 75%;
  }

  .sidebar {
    width: 25%;
  }
</style>
