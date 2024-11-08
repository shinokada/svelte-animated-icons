import type { MetaProps } from 'runes-meta-tags';
import { ANALYTICS_ID_RUNES } from '$env/static/private';

const title = 'Svelte Animated Icons';
const description = 'A collection of animated SVG icons for Svelte with customizable draw transitions, events, and accessibility features. Each icon supports hover/click animations, customizable colors, sizes, and stroke widths.';
const imgUrl = 'https://open-graph-vercel.vercel.app/api/svelte-animated-icons';
const keywords = 'svelte, svelte5, icons, svg, animated-icons, draw-animation, accessible-icons, icon-library, svg-icons, ui-components, customizable-icons';

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
