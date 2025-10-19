# Illustrations Guide

This directory hosts inline illustration assets (SVG/Lottie) consumed by the front-end.

## Files

- `benchmark-hero.light.svg` / `benchmark-hero.dark.svg`  
- `submission-flow.light.svg` / `submission-flow.dark.svg`  
- `dashboard-aura.light.svg` / `dashboard-aura.dark.svg`  
- `login-backdrop.light.svg` / `login-backdrop.dark.svg`  
- `sparkles.lottie.json` (optional animated overlay)

## Usage

1. Light theme assets should use `.light.svg`; dark mode should reference `.dark.svg`.  
2. Components obtain paths via `getIllustration(key, theme)` from `src/lib/illustrations.ts`.  
3. Keep file names hyphen-case; avoid spaces; optimise SVG with SVGO before commit.

## Adding new assets

1. Export SVG at 1x with transparent background.  
2. Provide both light/dark versions where applicable.  
3. Place animated overlays (Lottie) with `.json` extension and reference via `getIllustration`.

