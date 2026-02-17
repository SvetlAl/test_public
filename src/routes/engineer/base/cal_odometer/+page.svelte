<!-- \src\routes\engineer\base\main.svelte -->

<script>
  import CentralButton from '../../../../components/engineer/CentralButton.svelte';
  import RoundButton from '../../../../components/engineer/RoundButton.svelte';
</script>

<main class="fullscreen">
  <!-- content-area -->
  <div class="content-area">
    
    <div class="buttons-container">
      <CentralButton 
        text="Connect" 
        currentColor="#0000FF" 
        size={220} 
        fontColor="#FFFFFF" 
        canvasColor="#1A1F35" 
        borderColor="#DDDDDD"
      />
    </div>

    <div class="buttons-container">
      <RoundButton 
        text="Connect" 
        width={140} 
        height={50} 
        currentColor="#0000FF" 
        fontColor="#FFFFFF" 
        canvasColor="#1A1F35" 
        borderColor="#DDDDDD"
      />
    </div>


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