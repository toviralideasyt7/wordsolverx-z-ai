<script lang="ts">
  let {
    publishedDate,
    modifiedDate = publishedDate
  }: {
    publishedDate?: string | null;
    modifiedDate?: string | null;
  } = $props();
</script>

<svelte:head>
  {#if publishedDate}
    <meta property="article:published_time" content={publishedDate} />
  {/if}
  {#if modifiedDate}
    <meta property="article:modified_time" content={modifiedDate} />
  {/if}
</svelte:head>
