<script>
  import Board from "./Board.svelte"
</script>

<main class="holder">
  <div class="board">
    <Board />
  </div>
  <div class="sidebar">{"Sidebar"}</div>
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
