<script lang="ts">
  import '../app.css';
  import { Runatics } from 'runatics';
  import { MetaTags, deepMerge } from 'runes-meta-tags';
  import { page } from '$app/state';
  import Nav from './utils/Nav.svelte';
  import Footer from './utils/Footer.svelte';
  let { children, data } = $props();
  const analyticsId = $derived(data.ANALYTICS_ID_RUNES);
  // meta tags
  let metaTags = $derived(
    page.data.pageMetaTags
      ? deepMerge(page.data.layoutMetaTags, page.data.pageMetaTags)
      : data.layoutMetaTags
  );
</script>

<Runatics {analyticsId} />
<MetaTags {...metaTags} />

<Nav />
<div class="relative mx-auto mt-16 h-full max-w-7xl overflow-y-auto px-8">
  {@render children()}
</div>
<Footer />
