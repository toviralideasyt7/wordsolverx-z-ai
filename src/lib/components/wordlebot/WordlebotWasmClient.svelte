<script lang="ts">
        import { onDestroy, onMount } from 'svelte';
        import WordlebotSkeleton from './WordlebotSkeleton.svelte';
        import type { WordlebotAppPageConfig } from '$lib/wordlebot-wasm/types';

        let { config }: { config: WordlebotAppPageConfig } = $props();

        let host: HTMLDivElement | null = null;
        let isStarted = $state(false);
        let isLoading = $state(false);
        let errorMessage = $state('');
        let cleanup: (() => void) | undefined;

        function scopeWasmStyles(css: string) {
                const scoped = css
                        .replace(/:root\s*\{/g, '.wordlebot-scope {')
                        .replace(/html,\s*body\s*\{/g, '.wordlebot-scope {')
                        .replace(/^body\s*\{/gm, '.wasm-body {')
                        .replace(/:host\s*\{/g, '.wordlebot-scope {')
                        .replace(/\.shadow-body/g, '.wasm-body');

                return `@scope (.wordlebot-scope) {\n${scoped}\n}`;
        }

        async function start() {
                if (!host || isStarted) return;

                isStarted = true;
                isLoading = true;
                errorMessage = '';
                cleanup?.();

                try {
                        const [{ default: rawStyles }, { mountWordlebotApp }] = await Promise.all([
                                import('$lib/wordlebot-wasm/styles.css?raw'),
                                import('$lib/wordlebot-wasm/app')
                        ]);

                        host.innerHTML = '';

                        const resetWrapper = document.createElement('div');
                        resetWrapper.className = 'wordlebot-scope';

                        const style = document.createElement('style');
                        style.textContent = scopeWasmStyles(rawStyles);

                        const body = document.createElement('div');
                        body.className = 'wasm-body';

                        const appTarget = document.createElement('div');
                        body.appendChild(appTarget);

                        resetWrapper.append(style, body);
                        host.append(resetWrapper);

                        cleanup = mountWordlebotApp(appTarget, config);
                } catch (error) {
                        errorMessage =
                                error instanceof Error ? error.message : 'The solver engine could not load.';
                        isStarted = false;
                } finally {
                        isLoading = false;
                }
        }

        onMount(() => {
                if (typeof window === 'undefined') return;

                // Auto-start when the solver area scrolls into view
                const observer = new IntersectionObserver(
                        (entries) => {
                                for (const entry of entries) {
                                        if (entry.isIntersecting && !isStarted && !isLoading) {
                                                start();
                                        }
                                }
                        },
                        { rootMargin: '200px', threshold: 0.05 }
                );

                if (host) observer.observe(host);

                return () => {
                        observer.disconnect();
                };
        });

        onDestroy(() => {
                cleanup?.();
        });
</script>

{#if !isStarted}
        <WordlebotSkeleton {config} />
{/if}

{#if errorMessage}
        <div class="mx-auto w-full max-w-5xl px-4 py-6 text-center sm:px-6 lg:px-8">
                <div class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        {errorMessage}
                        <button
                                type="button"
                                class="ml-2 font-semibold underline"
                                onclick={start}
                        >
                                Retry
                        </button>
                </div>
        </div>
{/if}

<div
        bind:this={host}
        class="solver-host block w-full"
        style="min-height: 280px;"
></div>

<style>
        :global(.wordlebot-scope) {
                all: initial;
                display: block;
                width: 100%;
                font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif;
                color: #1a1a1b;
        }

        .solver-host {
                min-height: 280px;
        }
</style>
