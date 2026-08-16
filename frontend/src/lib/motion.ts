/**
 * Central animation configuration:
 * GSAP custom eases ".3,1,.3,1" (smooth), ".3,0,.3,1" (nav), ".6,0,.2,1" (slow/slider)
 * and durations: .4s fast, .6s primary, .8s smooth, 1.2s slider, 2s loader expo.
 */
export const EASE = {
  /** cubic-bezier(.3, 1, .3, 1) — the site's primary easing */
  smooth: [0.3, 1, 0.3, 1] as const,
  /** cubic-bezier(.3, 0, .3, 1) — nav animations */
  nav: [0.3, 0, 0.3, 1] as const,
  /** cubic-bezier(.6, 0, .2, 1) — slow / slider */
  slow: [0.6, 0, 0.2, 1] as const,
  /** expo.out */
  expoOut: [0.16, 1, 0.3, 1] as const,
  /** expo.inOut */
  expoInOut: [0.87, 0, 0.13, 1] as const,
  /** expo.in */
  expoIn: [0.7, 0, 0.84, 0] as const,
  /** slider text transition */
  filter: [0.16, 1, 0.3, 1] as const,
} as const;

export const DURATION = {
  fast: 0.4,
  primary: 0.6,
  smooth: 0.8,
  slow: 1.2,
  loader: 2,
} as const;

/** Page transition offset in ms (transitionOffset = 450) */
export const TRANSITION_OFFSET = 450;

/** Slider auto-advance duration in seconds (progress bar 5s) */
export const SLIDER_DURATION = 5;
