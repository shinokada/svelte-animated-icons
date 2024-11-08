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

interface Props extends SVGAttributes<SVGElement> {
pauseDuration?: number;
event?: 'onmouseenter' | 'onclick' | 'none';
title?: TitleType;
desc?: DescType;
ariaLabel?: string;
size?: number;
role?: string;
color?: string;
strokeWidth?: number;
transitionParams?: DrawParams;
}
