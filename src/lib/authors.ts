
import { generatePersonAuthorSchema } from '$lib/seo';

// E-E-A-T: All content is authored by Preston Hayes, the verified puzzle analyst.
// Removed fake rotating author names — Google's quality raters penalize
// fabricated bylines that lack verifiable identity signals.
export const PRESTON_HAYES_AUTHOR_NAME = 'Preston Hayes';
export const PRESTON_HAYES_AUTHOR_URL = 'https://wordsolverx.com/about#preston-hayes';
export const PRESTON_HAYES_AUTHOR_IMAGE = '/author-wordsolverx.webp';
export const PRESTON_HAYES_AUTHOR_IMAGE_URL = 'https://wordsolverx.com/author-wordsolverx.webp';
export const PRESTON_HAYES_AUTHOR_DESCRIPTION =
    'Preston Hayes has been solving and analyzing daily word puzzles since Wordle launched in October 2021. He maintains a daily solving streak across Wordle, Quordle, and Nerdle, and has written over 500 daily puzzle guides. His approach focuses on statistical letter frequency and strategic elimination rather than guessing — the same logic that powers the solvers on this site.';
export const PRESTON_HAYES_AUTHOR_JOB_TITLE = 'Word Puzzle Analyst';
export const PRESTON_HAYES_AUTHOR_KNOWS_ABOUT = [
    'Wordle',
    'Word Puzzles',
    'Daily Puzzle Answers',
    'Puzzle Solver Tools',
    'Information Theory'
];
// E-E-A-T: External verifiable profile links so Google can disambiguate
// the author entity across the web. Adding LinkedIn and Twitter/X
// alongside the brand social accounts.
export const PRESTON_HAYES_AUTHOR_SAME_AS = [
    'https://www.linkedin.com/in/preston-hayes-wordsolverx/',
    'https://x.com/WordSolverX',
    'https://www.facebook.com/wordsolverx/',
    'https://t.me/wordsolverx'
];

// All pages use Preston Hayes as the credited author for E-E-A-T consistency.
export function getAuthorForGame(_gameName: string): string {
    return PRESTON_HAYES_AUTHOR_NAME;
}

export function getAuthorProfileUrl(_authorName?: string): string {
    return PRESTON_HAYES_AUTHOR_URL;
}

export function getPrestonHayesAuthorSchema() {
    return generatePersonAuthorSchema(
        PRESTON_HAYES_AUTHOR_NAME,
        PRESTON_HAYES_AUTHOR_URL,
        PRESTON_HAYES_AUTHOR_IMAGE_URL,
        PRESTON_HAYES_AUTHOR_JOB_TITLE,
        PRESTON_HAYES_AUTHOR_KNOWS_ABOUT,
        PRESTON_HAYES_AUTHOR_SAME_AS
    );
}
