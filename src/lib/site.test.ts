import { describe, expect, it } from "vitest";
import { CALCFUEL_ORG, OPERATOR_NAME, OPERATOR_URL } from "./site";

describe("CALCFUEL_ORG", () => {
  it("does not point Google at a parent brand", () => {
    expect("parentOrganization" in CALCFUEL_ORG).toBe(false);
    expect(JSON.stringify(CALCFUEL_ORG)).not.toMatch(/neutrino/i);
  });

  it("publishes and reviews under the CalcFuel name only", () => {
    expect(OPERATOR_NAME).toBe("CalcFuel");
    expect(OPERATOR_URL).toBe("https://calcfuel.com");
    expect(`${OPERATOR_NAME} ${OPERATOR_URL}`).not.toMatch(/neutrino/i);
  });
});
