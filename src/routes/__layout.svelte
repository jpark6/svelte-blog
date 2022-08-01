<!-- Layout Component-->
<script lang="ts">
import Header from "./lib/components/Header.svelte";
import './lib/styles/style.css';
</script>

<Header />
<main>
  <slot />
</main>

<footer>This is a Footer~</footer>
