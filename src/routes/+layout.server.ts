import type { MetaProps } from 'runes-meta-tags';
import { ANALYTICS_ID_RUNES } from '$env/static/private';

const title = 'Svelte Animated Icons';
const description = 'A collection of Shilds badge components for Svelte Runes';
const imgUrl = 'https://open-graph-vercel.vercel.app/api/svelte-animated-icons';
const keywords = 'svelte, runes, sveltekit, shields.io, badges';

export const load = ({ url }) => {
  const layoutMetaTags: MetaProps = {
    title,
    description,
    keywords,
    twitter: {
      card: 'summary_large_image',
      site: '@shinokada',
      handle: '@shinokada',
      title,
      description,
      image: imgUrl,
      imageAlt: title
    },
    og: {
      type: 'website',
      title,
      description,
      url: url.href,
      image: imgUrl,
      imageAlt: title,
      siteName: title,
      imageWidth: '1200',
      imageHeight: '630'
    }
  };
  return {
    layoutMetaTags,
    ANALYTICS_ID_RUNES
  };
};
