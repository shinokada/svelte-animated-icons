<script>
  import { Footer, FooterBrand, FooterLink, FooterLinkGroup } from 'flowbite-svelte';
</script>

<Footer
  class="rounded-none border-t border-gray-200 shadow-none dark:border-gray-600 dark:bg-stone-900"
  footerType="logo"
>
  <div class="mx-auto max-w-7xl sm:flex sm:items-center sm:justify-between">
    <FooterBrand href="https://www.codewithshin.com/" name="codewithshin.com" />
    <FooterLinkGroup
      class="mt-3 flex flex-wrap items-center text-sm text-gray-500 sm:mt-0 dark:text-gray-400"
    >
      <FooterLink href="/flowbite">Flowbite</FooterLink>
      <FooterLink href="/hero">Hero</FooterLink>
      <FooterLink href="/ion">Ion</FooterLink>
      <FooterLink href="/custom">Custom</FooterLink>
      <FooterLink href="/custom">Svelte Animate</FooterLink>
    </FooterLinkGroup>
  </div>
</Footer>
