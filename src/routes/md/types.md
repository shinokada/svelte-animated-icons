import type { DrawParams } from 'svelte/transition';
import type { SVGAttributes } from 'svelte/elements';

type TitleType = {
  id?: string;
  title?: string;
};
type DescType = {
  id?: string;
  desc?: string;
};

interface Props extends SVGAttributes<SVGSVGElement> {
  pauseDuration?: number;
  event?: 'hover' | 'click' | 'none';
  title?: TitleType;
  desc?: DescType;
  ariaLabel?: string;
  size?: number;
  color?: string;
  strokeWidth?: number; // flowbite/hero
  transitionParams?: DrawParams;
  focusable?: 'true' | 'false' | 'auto';
}
