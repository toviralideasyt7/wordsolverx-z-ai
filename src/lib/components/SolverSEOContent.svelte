<script lang="ts">
  interface SolverSection {
    title: string;
    paragraphs: string[];
  }

  interface SolverFaq {
    question: string;
    answer: string;
  }

  let {
    eyebrow = 'Solver guide',
    title,
    intro,
    sections = [],
    faqs = []
  }: {
    eyebrow?: string;
    title: string;
    intro: string;
    sections?: SolverSection[];
    faqs?: SolverFaq[];
  } = $props();
</script>

<section class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
  <p class="text-xs font-bold uppercase tracking-[0.24em] text-teal-600">{eyebrow}</p>
  <h2 class="mt-3 text-3xl font-black tracking-tight text-slate-900">{title}</h2>
  <p class="mt-4 text-lg leading-8 text-slate-600">{intro}</p>

  {#if sections.length > 0}
    <div class="mt-8 space-y-6">
      {#each sections as section}
        <div class="rounded-2xl bg-slate-50 p-6">
          <h3 class="text-xl font-bold text-slate-900">{section.title}</h3>
          <div class="mt-3 space-y-3 text-base leading-7 text-slate-600">
            {#each section.paragraphs as paragraph}
              <p>{paragraph}</p>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}

  {#if faqs.length > 0}
    <div class="mt-8 space-y-4">
      {#each faqs as faq}
        <div class="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 class="text-base font-bold text-slate-900">{faq.question}</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p>
        </div>
      {/each}
    </div>
  {/if}
</section>
