// Featured Work content module.
// Phase 1A: a single public featured project (Forno Nero) deployed on Vercel.
// The cover field is intentionally null — the homepage renders a CSS-based
// cinematic fallback frame until final visuals are provided.

export type WorkStatus = 'featured' | 'preview' | 'lab';

export type WorkCover = {
  desktop: string;
  mobile: string;
  alt: string;
} | null;

export type Work = {
  slug: string;
  /** Canonical project name displayed inside the frame. */
  name: string;
  /** Category line: short, neutral, editorial. */
  category: string;
  /** One editorial sentence. */
  tagline: string;
  /** 1–2 sentence body description. */
  description: string;
  status: WorkStatus;
  /** Final cover image set; null = render CSS fallback. */
  cover: WorkCover;
  /**
   * External "View live project" link.
   * Opens the existing Vercel deployment in a new tab.
   *
   * TODO (Phase 1A): paste the live Vercel URL here before launch.
   * Leave empty string to hide the live-link button until set.
   */
  liveUrl: string;
};

/**
 * Phase 1A featured work — Forno Nero only.
 * Do not add Natalija or fake Lab projects in this phase.
 */
export const featuredWork: Work = {
  slug: 'forno-nero',
  name: 'Forno Nero',
  category: 'Hospitality / Digital Experience',
  tagline: 'A digital experience built like a night out.',
  description:
    'Fire, rhythm, appetite. Forno Nero is the studio’s first public frame — a cinematic site where atmosphere leads the menu.',
  status: 'featured',
  cover: null,
  // ↓↓↓ REPLACE WITH ACTUAL VERCEL URL BEFORE LAUNCH ↓↓↓
  liveUrl: '',
};
