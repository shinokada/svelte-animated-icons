<script lang="ts">
  let color = '#0F172A';
  let strokeWidth = '1.5';
</script>

<style>
  .icon-container {
    display: inline-block;
    cursor: pointer;
  }

  .icon-container:hover .horizontal-line {
    animation: contract-left 0.8s ease;
  }

  @keyframes contract-left {
    0%, 100% {
      transform: scaleX(1);
      transform-origin: right;
    }
    50% {
      transform: scaleX(0.8);
      transform-origin: right;
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
      class="horizontal-line"
      d="M10.5 19.5L3 12M3 12L10.5 4.5M3 12H21" 
      stroke={color} 
      stroke-width={strokeWidth} 
      stroke-linecap="round" 
      stroke-linejoin="round"
    />
  </svg>
</div>