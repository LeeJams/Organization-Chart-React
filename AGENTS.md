# Repository guide

## Scope

This repository publishes `organization-chart-react` and builds its GitHub
Pages demo. Keep library code framework-focused and dependency-light.

## Source of truth

- Public exports and types: `src/index.ts` and `src/types.ts`
- Component behavior: `src/OrganizationChart.tsx`
- Recursive rendering: `src/OrganizationChartNode.tsx`
- Package styles: `src/OrganizationChart.css`
- Demo-only UI: `src/App.tsx` and `src/App.css`
- Behavioral contract: `tests/OrganizationChart.spec.tsx`
- Published ESM/CJS type contract: `tests/consumer/`

Do not edit generated `dist/` output by hand. The `docs/` directory is generated
by `npm run build-demo`.

## Compatibility

- Preserve the existing default export and `onClickNode` behavior.
- Prefer `onSelect` for new selection features.
- Never mutate the `data` prop.
- Use optional IDs and deterministic paths for keys and selection payloads.
- Keep React and React DOM as peer dependencies.
- Keep package CSS separate from demo-only CSS.

## Validation

Run `npm run check` after library changes. Run `npm run build-demo` when the
demo, metadata, public AI documentation, or demo styles change.
