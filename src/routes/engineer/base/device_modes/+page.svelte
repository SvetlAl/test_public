<!-- \src\routes\engineer\base\main.svelte -->

<script>
  import CentralButton from '../../../../components/engineer/CentralButton.svelte';
  import RoundButton from '../../../../components/engineer/RoundButton.svelte';
</script>

<main class="fullscreen">
  <!-- content-area -->
  <div class="content-area">
    
  
  </div><!-- content-area -->
</main>

<style>
  .fullscreen {
    position: fixed;
    inset: 0;
    margin: 0;
    padding: 0;
    background: url('/engineer/engineer_background.png') center / cover no-repeat;
    background-color: #0d1425;
    color: white;
    font-family: system-ui, sans-serif;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100vw;
    overflow: visible;
    z-index: auto;
  }

  .content-area {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .buttons-container {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;          /* расстояние между кнопками */
    justify-content: center;
    align-items: center;
    max-width: 90%;
  }

  /* Опционально: если хочешь, чтобы на очень маленьких экранах кнопки шли в столбик */
  @media (max-width: 768px) {
    .buttons-container {
      flex-direction: column;
      gap: 4rem;
    }
  }
</style>