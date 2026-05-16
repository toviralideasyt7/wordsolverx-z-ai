<script lang="ts">
  let {
    gameName,
    answer
  }: {
    gameName: string;
    answer?: string | null;
  } = $props();
</script>

{#if answer}
  <noscript>
    <p>
      The {gameName} answer for today is:
      <strong>{answer}</strong>
    </p>
  </noscript>
{/if}
