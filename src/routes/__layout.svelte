<!-- Layout Component-->
<script context="module">
export const load = ({ url }) => {
  const currentRoute = url.pathname;

  return {
    props: {
      currentRoute
    }
  };
}
</script>
<script lang="ts">
import Header from "./lib/components/Header.svelte";
import './lib/styles/style.scss';
import { fade } from 'svelte/transition';
export let currentRoute;
</script>

<Header />
{#key currentRoute}
<main
  in:fade={{ duration: 150, delay: 150}}
  out:fade={{ duration: 150 }}
>
  <slot />
</main>
{/key}

<footer>This is a Footer~</footer>
