import { describe, expect, it } from "vitest";
import { CALCFUEL_ORG } from "./site";

describe("CALCFUEL_ORG", () => {
  it("does not point Google at a parent brand", () => {
    expect("parentOrganization" in CALCFUEL_ORG).toBe(false);
    expect(JSON.stringify(CALCFUEL_ORG)).not.toMatch(/neutrino/i);
  });
});
