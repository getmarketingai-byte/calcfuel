# Design system (Phase 4)

Shared calculator UI lives in [`src/components/calc/`](../src/components/calc/).

| Component | Role |
|-----------|------|
| `CalculatorShell` | Title, toolbar, inputs, results, footer |
| `UnitToggle` | Metric / imperial |
| `InputGroup` / `SelectGroup` | Labelled fields |
| `ResultCard` / `ResultGrid` | Decision outputs |
| `ScenarioComparison` | A/B speed or option compare |
| `Methodology` | Collapsible “how it works” |
| `Sources` | Citations list |
| `Disclaimer` | planning / marine / financial |
| `CommercialPlacement` | adsense \| affiliate \| direct_sponsor abstraction |

Import from `@/components/calc`.
