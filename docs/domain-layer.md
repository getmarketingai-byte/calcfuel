# CalcFuel Domain Layer

**Phase:** 3 (approved 2026-08-10)  
**Thesis:** Transport/trip decision → Trip/asset → Calculation → Result

```text
src/domain/
├── units.ts              # UnitSystem, currency codes, conversions
├── preferences.ts        # localStorage prefs + UserAsset sketch
├── calculations/
│   └── primitives.ts     # fuelUsed, fuelCost, range, duration, reserve, towingPenalty, compare*
├── models/
│   ├── boatTrip.ts       # Boat Trip Fuel Planner
│   ├── roadTrip.ts       # Trip / commute / carpool / return
│   ├── towingTrip.ts     # Towing / caravan penalty
│   ├── driveVsFly.ts     # Drive vs fly totals
│   ├── vehicleComparison.ts  # Hybrid/EV vs petrol foundation
│   └── fuelBudget.ts     # Weekly/monthly/annual fuel spend
└── index.ts
```

All calculation functions are **pure** and covered by Vitest (`npm test`).

UI calculators (Phase 5) should call these models instead of inline formulas.

**First consumer:** Boat Trip Fuel Planner (`/calculators/boat-fuel-calculator`) rebuilt on `calculateBoatTrip` + calc design system.
