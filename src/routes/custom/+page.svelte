<script lang="ts">
  import BeakerCustom from '$lib/custom/BeakerCustom.svelte';
  import { ArrowDownCustom, ArrowLeftCustom, ArrowRightCustom, ArrowUpCustom } from '$lib/custom';
</script>

<div class="flex flex-col items-center justify-center">
  <h2>BeakerCustom</h2>
  <BeakerCustom size={50} color="red" />
  <ArrowDownCustom />
  <ArrowLeftCustom />
  <ArrowRightCustom />
  <ArrowUpCustom />
</div>
