<script lang="ts">
  let color = '#0F172A';
  let strokeWidth = '1.5';
</script>

<style>
  .icon-container {
    display: inline-block;
    cursor: pointer;
  }

  .icon-container:hover .vertical-line {
    animation: contract-top 0.8s ease;
  }

  @keyframes contract-right {
    0%, 100% {
      transform: scaleX(1);
      transform-origin: left;
    }
    50% {
      transform: scaleX(0.8);
      transform-origin: left;
    }
  }

  @keyframes contract-top {
    0%, 100% {
      transform: scaleY(1);
      transform-origin: bottom;
    }
    50% {
      transform: scaleY(0.8);
      transform-origin: bottom;
    }
  }
</style>

<div class="icon-container">
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      class="vertical-line"
      d="M4.5 10.5L12 3M12 3L19.5 10.5M12 3V21" 
      stroke={color} 
      stroke-width={strokeWidth} 
      stroke-linecap="round" 
      stroke-linejoin="round"
    />
  </svg>
</div>