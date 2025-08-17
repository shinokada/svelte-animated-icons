<script lang="ts">
	let color = '#0F172A';
	let strokeWidth = '1.5';
</script>

<div class="icon-container">
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			class="vertical-line"
			d="M19.5 13.5L12 21M12 21L4.5 13.5M12 21L12 3"
			stroke={color}
			stroke-width={strokeWidth}
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</div>

<style>
	.icon-container {
		display: inline-block;
		cursor: pointer;
	}

	.icon-container:hover .vertical-line {
		animation: contract-bottom 0.8s ease;
	}

	@keyframes contract-bottom {
		0%,
		100% {
			transform: scaleY(1);
			transform-origin: top;
		}
		50% {
			transform: scaleY(0.8);
			transform-origin: top;
		}
	}
</style>
