# portfolio-v4

A plain one-page portfolio. Content lives in `data/`.

- `bun dev` to run locally
- `bun run build` for the static export (`out/`)
- `bun test` checks the content rules
- `bun run check-links` checks every external link

To add a project, add an object to `data/selected-work.ts`. Entries render in array order.
