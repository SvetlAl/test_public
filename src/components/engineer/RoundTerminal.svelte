<!-- \src\components\engineer\RoundTerminal.svelte -->

<script>


  let {
  width = 450,
  height = 450,
  borderWidth = 2,
  radius = 10,
  fontSize = 14,
  fontColor = '#FFFFFF', // Белый текст
  borderColor = '#DDDDDD', // Цвет границы (как в вашем примере)
  gradientStart = 'rgb(8, 95, 146)',
  gradientEnd = 'rgb(39, 143, 217)',
  text = 'Connect', // Начальный текст
  editable = false
  } = $props();

</script>

<div
  class="round-terminal"
  style="
  height: 100%;
    border: {borderWidth}px solid {borderColor};
    border-radius: {radius}px;
    background: linear-gradient(to right, {gradientStart}, {gradientEnd});
  "
>

    <pre>{"content"}</pre>
  </div>


<style>
  .terminal-root {

  }

  .round-terminal {

  }

  .terminal-content {
    box-sizing: border-box;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .terminal-content:focus {
    outline: none;
  }

  /* Стили для скроллбара, чтобы имитировать QML ScrollBar */
  .terminal-content::-webkit-scrollbar {
    width: 10px;
  }

  .terminal-content::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
  }
</style>