import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Apostrophes in JSX prose render correctly; escaping hundreds of them adds no value.
      "react/no-unescaped-entities": "off",
      // Hydration-safe localStorage reads set state in effects by design; keep visible as warnings.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**", "next-env.d.ts", "coverage/**"],
  },
];

export default config;
