<script lang="ts">
  import '../app.css';
  import { Runatics } from 'runatics';
  import { RunesMetaTags, deepMerge } from 'runes-meta-tags';
  import { page } from '$app/state';
  import Nav from './utils/Nav.svelte';
  import Footer from './utils/Footer.svelte';
  let { children, data } = $props();
  const analyticsId = data.ANALYTICS_ID_RUNES;
  // meta tags
  let metaTags = $state(page.data.pageMetaTags ? deepMerge(page.data.layoutMetaTags, page.data.pageMetaTags) : data.layoutMetaTags);
  $effect(() => {
    metaTags = page.data.pageMetaTags ? deepMerge(page.data.layoutMetaTags, page.data.pageMetaTags) : data.layoutMetaTags;
  });
</script>

<Runatics {analyticsId} />
<RunesMetaTags {...metaTags} />

<Nav />
<div class="relative mx-auto mt-16 h-full max-w-5xl overflow-y-auto px-8 pb-20">
  {@render children()}
</div>
<Footer />
