import type { MetaProps } from 'runes-meta-tags';

const title = 'Svelte Animated Icons (Flowbite icons)';
const description = 'Interactive Svelte animated icons from Flowbite library';
const imgUrl = 'https://open-graph-vercel.vercel.app/api/svelte-animated-icons';

export const load = ({ url }) => {
  const pageMetaTags: MetaProps = {
    title,
    description,
    og: {
      title,
      description,
      image: imgUrl,
      url: url.href
    },
    twitter: {
      title,
      description,
      image: imgUrl
    }
  };
  return { pageMetaTags };
};
