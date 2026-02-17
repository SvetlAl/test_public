<!-- \src\routes\+page.svelte -->
<script>
  import { goto } from '$app/navigation';

  function goToEngineer() {
    goto('/engineer/base/main');
  }
</script>

<main class="fullscreen">
  <!-- top-zone -->
  <div class="top-zone">
    <button
      class="w-full h-full opacity-10" 
      aria-label="Engineer menu"
      onclick={goToEngineer}
      onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && goToEngineer()}
    >
    </button>
  </div> <!-- top-zone -->

</main>

<style>
  .fullscreen {
    position: fixed;
    inset: 0;
    margin: 0;
    padding: 0;

    background: url('/background_0.png') center / 100% 100% no-repeat;
    background-color: #0d1425;

    color: white;
    font-family: system-ui, sans-serif;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;

    text-align: center;
    min-height: 100vh;
    width: 100vw;
  }

  .top-zone {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 25%; /* % of total height*/
    z-index: 10;
  }

  button {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    color: transparent;
  }

  button:focus {
    outline: 3px solid #60a5fa;
    outline-offset: -3px;
  }

</style>