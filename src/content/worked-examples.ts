/**
 * One worked example per calculator, keyed by slug.
 *
 * Rules for anything added here:
 *  - the scenario must be specific and plausible, and unique across the site;
 *  - every figure must be a real output of that calculator's own formula;
 *  - fuel prices come from src/lib/fuel-prices.ts, so they move when the data does;
 *  - the takeaway must say something the answer does not.
 *
 * Rendered by src/components/calc/WorkedExample.tsx. Enforced by AC12 in the gate.
 */

import type { WorkedStep } from "@/components/calc/WorkedExample";
import {
  DEFAULT_DIESEL_PRICE_AUD_PER_L,
  DEFAULT_PETROL_PRICE_AUD_PER_L,
} from "@/lib/fuel-prices";

export interface WorkedExampleContent {
  scenario: string;
  inputs: { label: string; value: string }[];
  steps: WorkedStep[];
  answer: string;
  takeaway: string;
}

/** Five-city averages from src/lib/fuel-prices.ts — move when the ACCC snapshot does. */
const PETROL = DEFAULT_PETROL_PRICE_AUD_PER_L;
const DIESEL = DEFAULT_DIESEL_PRICE_AUD_PER_L;

function formatAud(amount: number, digits = 0): string {
  const factor = 10 ** digits;
  const rounded = Math.round(amount * factor) / factor;
  const sign = rounded < 0 ? "-" : "";
  const [whole, frac = ""] = Math.abs(rounded).toFixed(digits).split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return digits === 0 ? `${sign}$${grouped}` : `${sign}$${grouped}.${frac}`;
}

const tripFuelCost = 144.3 * PETROL;
const towExtraCost = 84 * DIESEL;
const towWholeCost = 294 * DIESEL;
const towDoubledExtra = 210 * DIESEL;
const budgetWeekly = 43.9 * PETROL;
const driveFuelAndTolls = 155.6 * PETROL + 30;
const motorcycleMonthly = 55.5 * PETROL;
const economyAnnual = 270 * PETROL;
const hybridAnnual = 16_000 / 100 * 4.7 * PETROL;
const petrolSuvAnnual = 16_000 / 100 * 6.5 * PETROL;
const hybridSaving = petrolSuvAnnual - hybridAnnual;
const evPetrolAnnual = 15_000 / 100 * 7.8 * PETROL;
const evAdvantage = evPetrolAnnual - 672 + 400;
const idleVanCost = 168.8 * DIESEL;
const carpoolDaily = 6.64 * PETROL;
const carpoolRate = carpoolDaily / 302;
const commuteDaily = (76 / 100) * 9.1 * PETROL;
const commuteAnnual = 1_591 * PETROL;
const generatorLph = 0.035 * 6 + 0.265 * 3;
const generatorCost = generatorLph * 36 * DIESEL;
const h2Per100 = 1.05 * 33;
const h2Annual = 150 * h2Per100;
const hydrogenPetrolPer100 = 7.5 * PETROL;
const hydrogenPetrolAnnual = 150 * hydrogenPetrolPer100;

export const WORKED_EXAMPLES: Record<string, WorkedExampleContent> = {
  "boat-fuel-calculator": {
    scenario:
      "A 6.5 m centre console runs from Pittwater out to Broken Bay and back — 40 nautical miles each way at a 24-knot cruise. The owner knows the engine burns about 55 litres an hour at that setting, and wants to know whether the 400-litre tank covers it with a proper reserve.",
    inputs: [
      { label: "Distance each way", value: "40 NM (return trip on)" },
      { label: "Cruise speed", value: "24 knots" },
      { label: "Known burn rate", value: "55 L/h" },
      { label: "Tank capacity", value: "400 L" },
      { label: "Fuel price", value: `$${PETROL.toFixed(3)}/L (ACCC five-city petrol; use your marina's price)` },
    ],
    steps: [
      { label: "Total distance", math: "40 NM × 2", result: "80 NM" },
      { label: "Time under way", math: "80 NM ÷ 24 kn", result: "3 h 20 m" },
      { label: "Fuel required", math: "3.33 h × 55 L/h", result: "183 L" },
      { label: "Trip cost", math: `183 L × $${PETROL.toFixed(3)}`, result: formatAud(183 * PETROL) },
      { label: "Safe range", math: "(400 L × 0.85) ÷ 55 L/h × 24 kn", result: "148 NM" },
    ],
    answer: `183 litres, ${formatAud(183 * PETROL)}, three hours twenty minutes under way, on a safe range of 148 NM.`,
    takeaway:
      "The trip fits, but read the one-third figure rather than the range figure: a third of usable fuel is 113 litres, which is about 49 NM outbound. A 40 NM leg sits inside that with 9 NM of margin — enough for a headwind on the way home, not enough to add a detour without refuelling.",
  },

  "trip-fuel-cost-calculator": {
    scenario:
      "A family is driving Sydney to Melbourne and back for a week away. The car is a mid-size SUV that returns about 8.2 L/100km on a highway run — measured, not the brochure figure.",
    inputs: [
      { label: "One-way distance", value: "880 km" },
      { label: "Return trip", value: "Yes" },
      { label: "Fuel economy", value: "8.2 L/100km" },
      { label: "Fuel price", value: `$${PETROL.toFixed(3)}/L (five-city average)` },
      { label: "Occupants", value: "4" },
    ],
    steps: [
      { label: "Total distance", math: "880 km × 2", result: "1,760 km" },
      { label: "Fuel used", math: "1,760 ÷ 100 × 8.2 L", result: "144.3 L" },
      { label: "Fuel cost", math: `144.3 L × $${PETROL.toFixed(3)}`, result: formatAud(tripFuelCost) },
      { label: "Per person", math: `${formatAud(tripFuelCost)} ÷ 4`, result: formatAud(tripFuelCost / 4) },
    ],
    answer: `${formatAud(tripFuelCost)} in fuel for the round trip, or ${formatAud(tripFuelCost / 4)} a head with four in the car.`,
    takeaway:
      "Two numbers decide most drive-versus-fly arguments and both are here: the trip costs less than one discounted airfare, and fuel is a per-vehicle cost so the per-head figure falls with every passenger. Add tolls and one overnight stop before comparing against flights.",
  },

  "towing-fuel-cost-calculator": {
    scenario:
      "A dual-cab ute towing a 19-foot full-height caravan from Sydney to Byron Bay and back. Unloaded the ute returns 10.5 L/100km on the highway; the owner wants the extra cost of the van itself, not the total trip cost.",
    inputs: [
      { label: "Return distance", value: "2,000 km" },
      { label: "Unloaded economy", value: "10.5 L/100km" },
      { label: "Towing penalty", value: "+40% (caravan preset)" },
      { label: "Fuel price", value: `$${DIESEL.toFixed(3)}/L diesel` },
    ],
    steps: [
      { label: "Unloaded fuel", math: "2,000 ÷ 100 × 10.5 L", result: "210 L" },
      { label: "Towing fuel", math: "210 L × 1.40", result: "294 L" },
      { label: "Extra litres", math: "294 L − 210 L", result: "84 L" },
      { label: "Extra cost", math: `84 L × $${DIESEL.toFixed(3)}`, result: formatAud(towExtraCost) },
    ],
    answer: `At the caravan preset the van adds 84 litres and ${formatAud(towExtraCost)} to a 2,000 km round trip.`,
    takeaway:
      `That is the van's cost alone — the whole trip is ${formatAud(towWholeCost)} in diesel. Published tow tests of heavy vans at highway speed have measured consumption roughly doubling; at +100% the van would add 210 litres, or ${formatAud(towDoubledExtra)}. Speed is the lever: the penalty is mostly aerodynamic, so running at 90 km/h instead of 100–110 recovers a useful share of it.`,
  },


  "fuel-budget-planner": {
    scenario:
      "A two-car household wants a realistic fuel line in the monthly budget. One car does the school run and commute, the other is a weekend and errands vehicle that drinks noticeably more.",
    inputs: [
      { label: "Car 1 distance", value: "320 km/week" },
      { label: "Car 1 economy", value: "7.4 L/100km" },
      { label: "Car 2 distance", value: "180 km/week" },
      { label: "Car 2 economy", value: "11.2 L/100km" },
      { label: "Fuel price", value: `$${PETROL.toFixed(3)}/L` },
    ],
    steps: [
      { label: "Car 1 weekly fuel", math: "320 ÷ 100 × 7.4 L", result: "23.7 L" },
      { label: "Car 2 weekly fuel", math: "180 ÷ 100 × 11.2 L", result: "20.2 L" },
      { label: "Weekly cost", math: `43.9 L × $${PETROL.toFixed(3)}`, result: formatAud(budgetWeekly) },
      { label: "Annual cost", math: `${formatAud(budgetWeekly)} × 52`, result: formatAud(budgetWeekly * 52) },
    ],
    answer: `${formatAud(budgetWeekly)} a week, about ${formatAud((budgetWeekly * 52) / 12)} a month, ${formatAud(budgetWeekly * 52)} a year across both cars.`,
    takeaway:
      "The second car covers 36% of the distance but 46% of the fuel spend. If one vehicle has to go or be replaced, that split — not the odometer — is the number to argue from.",
  },

  "drive-vs-fly-calculator": {
    scenario:
      "Four people travelling Brisbane to Sydney for a long weekend, deciding between driving the family car and flying with a hire car at the other end.",
    inputs: [
      { label: "Return distance", value: "1,830 km" },
      { label: "Fuel economy", value: "8.5 L/100km" },
      { label: "Fuel price", value: `$${PETROL.toFixed(3)}/L` },
      { label: "Tolls", value: "$30" },
      { label: "Airfares", value: "4 × $189 return" },
      { label: "Bags, parking, hire car", value: "$160 + $95 + $270" },
    ],
    steps: [
      { label: "Drive: fuel", math: "1,830 ÷ 100 × 8.5 L", result: "155.6 L" },
      { label: "Drive: total", math: `155.6 L × $${PETROL.toFixed(3)} + $30`, result: formatAud(driveFuelAndTolls) },
      { label: "Fly: fares", math: "4 × $189", result: "$756" },
      { label: "Fly: total", math: "$756 + $160 + $95 + $270", result: "$1,281" },
    ],
    answer: `Driving costs ${formatAud(driveFuelAndTolls)} against $1,281 to fly — ${formatAud(1281 - driveFuelAndTolls)} cheaper for this group.`,
    takeaway:
      `Flying only becomes competitive below about two travellers, because fares scale per person and fuel does not. The real trade is time: the drive is roughly ten hours each way against four door to door, so the group is buying twelve hours back for ${formatAud(1281 - driveFuelAndTolls)}.`,
  },

  "motorcycle-fuel-cost-calculator": {
    scenario:
      "A commuter with both a 650 cc middleweight and a small SUV wants to know what riding instead of driving is worth over a year of ordinary commuting.",
    inputs: [
      { label: "Daily round trip", value: "60 km" },
      { label: "Commuting days", value: "22 per month" },
      { label: "Motorcycle economy", value: "4.6 L/100km" },
      { label: "Car economy", value: "8.8 L/100km" },
      { label: "Fuel price", value: `$${PETROL.toFixed(3)}/L` },
    ],
    steps: [
      { label: "Monthly distance", math: "60 km × 22", result: "1,320 km" },
      { label: "Motorcycle fuel", math: "1,320 ÷ 100 × 4.6 L", result: "60.7 L" },
      { label: "Car fuel", math: "1,320 ÷ 100 × 8.8 L", result: "116.2 L" },
      { label: "Monthly saving", math: `55.5 L × $${PETROL.toFixed(3)}`, result: formatAud(motorcycleMonthly) },
    ],
    answer: `${formatAud(motorcycleMonthly)} a month, about ${formatAud(motorcycleMonthly * 12)} a year, in fuel alone.`,
    takeaway:
      `Fuel is the smaller half of the picture. Set against it: motorcycle tyres last a fraction of a car's and cost a similar amount, chain and sprocket sets are a recurring item, and wet-weather days usually mean the car goes anyway. Treat ${formatAud(motorcycleMonthly * 12)} as the ceiling on the saving, not the expected value.`,
  },

  "fuel-economy-savings-calculator": {
    scenario:
      "A driver replaces a car returning 9.8 L/100km with one returning 8.3 L/100km, covering 18,000 km a year. The question is whether a 1.5 L/100km improvement is worth anything meaningful.",
    inputs: [
      { label: "Current economy", value: "9.8 L/100km (24.0 MPG)" },
      { label: "Improved economy", value: "8.3 L/100km (28.3 MPG)" },
      { label: "Annual distance", value: "18,000 km" },
      { label: "Fuel price", value: `$${PETROL.toFixed(3)}/L` },
    ],
    steps: [
      { label: "Fuel before", math: "18,000 ÷ 100 × 9.8 L", result: "1,764 L" },
      { label: "Fuel after", math: "18,000 ÷ 100 × 8.3 L", result: "1,494 L" },
      { label: "Litres saved", math: "1,764 L − 1,494 L", result: "270 L" },
      { label: "Annual saving", math: `270 L × $${PETROL.toFixed(3)}`, result: formatAud(economyAnnual) },
    ],
    answer: `270 litres and ${formatAud(economyAnnual)} a year.`,
    takeaway:
      `Note how differently the two scales read. In L/100km the gain looks modest at 1.5; in MPG it is 24 to 28, which sounds larger. Neither tells you much — the dollar figure does, and ${formatAud(economyAnnual)} a year is roughly a set of tyres.`,
  },

  "hybrid-vs-gas-calculator": {
    scenario:
      "A buyer is choosing between a mid-size SUV in petrol and hybrid trim. The hybrid costs about $3,000 more on the road and is rated 4.7 L/100km against 6.5 for the petrol. They drive 16,000 km a year.",
    inputs: [
      { label: "Purchase premium", value: "$3,000" },
      { label: "Hybrid economy", value: "4.7 L/100km" },
      { label: "Petrol economy", value: "6.5 L/100km" },
      { label: "Annual distance", value: "16,000 km" },
      { label: "Fuel price", value: `$${PETROL.toFixed(3)}/L` },
    ],
    steps: [
      { label: "Hybrid annual fuel", math: `16,000 ÷ 100 × 4.7 × $${PETROL.toFixed(3)}`, result: formatAud(hybridAnnual) },
      { label: "Petrol annual fuel", math: `16,000 ÷ 100 × 6.5 × $${PETROL.toFixed(3)}`, result: formatAud(petrolSuvAnnual) },
      { label: "Annual saving", math: `${formatAud(petrolSuvAnnual)} − ${formatAud(hybridAnnual)}`, result: formatAud(hybridSaving) },
      { label: "Break-even", math: `$3,000 ÷ ${formatAud(hybridSaving)}`, result: `${(3000 / hybridSaving).toFixed(1)} years` },
    ],
    answer: `The hybrid saves ${formatAud(hybridSaving)} a year and repays its premium in about ${(3000 / hybridSaving).toFixed(1)} years.`,
    takeaway:
      `Break-even is far more sensitive to distance than to fuel price. At 25,000 km a year the same premium clears in about ${(3000 / (hybridSaving * (25_000 / 16_000))).toFixed(1)} years; at 8,000 km it takes about ${(3000 / (hybridSaving * (8_000 / 16_000))).toFixed(1)}, by which point resale value matters more than fuel. Run your own annual distance before accepting a showroom payback figure.`,
  },

  "ev-vs-gas-calculator": {
    scenario:
      "A household comparing an electric hatch against the petrol equivalent. The EV costs $12,000 more, uses about 16 kWh/100km, and would charge at home on an off-peak tariff. The petrol car uses 7.8 L/100km. They cover 15,000 km a year and expect to save around $400 a year on servicing.",
    inputs: [
      { label: "Purchase premium", value: "$12,000" },
      { label: "EV consumption", value: "16 kWh/100km" },
      { label: "Home electricity", value: "28 c/kWh off-peak" },
      { label: "Petrol economy", value: "7.8 L/100km" },
      { label: "Annual distance", value: "15,000 km" },
      { label: "Servicing advantage", value: "$400/year" },
    ],
    steps: [
      { label: "EV annual energy", math: "15,000 ÷ 100 × 16 kWh × $0.28", result: "$672" },
      { label: "Petrol annual fuel", math: `15,000 ÷ 100 × 7.8 L × $${PETROL.toFixed(3)}`, result: formatAud(evPetrolAnnual) },
      { label: "Annual advantage", math: `${formatAud(evPetrolAnnual)} − $672 + $400`, result: formatAud(evAdvantage) },
      { label: "Break-even", math: `$12,000 ÷ ${formatAud(evAdvantage)}`, result: `${(12_000 / evAdvantage).toFixed(1)} years` },
    ],
    answer: `${formatAud(evAdvantage)} a year better off, repaying the premium in about ${(12_000 / evAdvantage).toFixed(1)} years and running roughly ${formatAud(evAdvantage * 10 - 12_000)} ahead over ten.`,
    takeaway:
      "This result depends almost entirely on charging at home off-peak. Shift half the charging to public DC at 65 c/kWh and the annual advantage falls by around $440, pushing break-even past seven years. Where you charge matters more than which EV you buy.",
  },

  "ev-charging-cost-calculator": {
    scenario:
      "An EV owner with a 64 kWh battery wants the real cost of a routine 20% to 80% top-up at home versus at a public DC charger on a road trip.",
    inputs: [
      { label: "Battery capacity", value: "64 kWh" },
      { label: "Charge window", value: "20% → 80%" },
      { label: "Home tariff", value: "28 c/kWh off-peak" },
      { label: "Charging losses", value: "11% (AC home charging)" },
      { label: "Public DC rate", value: "65 c/kWh" },
    ],
    steps: [
      { label: "Energy into battery", math: "64 kWh × 60%", result: "38.4 kWh" },
      { label: "Energy billed at home", math: "38.4 kWh ÷ 0.89", result: "43.1 kWh" },
      { label: "Home cost", math: "43.1 kWh × $0.28", result: "$12.07" },
      { label: "Public DC cost", math: "38.4 kWh × $0.65", result: "$24.96" },
    ],
    answer: "$12.07 at home against $24.96 on a public DC charger — the same charge for a shade over double.",
    takeaway:
      "The 11% AC charging loss is the part almost every comparison omits: you pay for 43.1 kWh at the meter and 38.4 reaches the battery. DC charging loses less on the vehicle side but bills at the dispenser, which is why its headline rate is the whole story and home charging's is not.",
  },

  "idling-fuel-waste-calculator": {
    scenario:
      "A courier operator suspects drivers are leaving vans running between drops. Telematics suggests about 45 minutes of idle time per vehicle per working day across a fleet of eight.",
    inputs: [
      { label: "Idle time", value: "45 min/day" },
      { label: "Idle burn rate", value: "0.9 L/h" },
      { label: "Working days", value: "250/year" },
      { label: "Fleet size", value: "8 vehicles" },
      { label: "Fuel price", value: `$${DIESEL.toFixed(3)}/L diesel` },
    ],
    steps: [
      { label: "Idle hours per van", math: "0.75 h × 250 days", result: "187.5 h" },
      { label: "Fuel per van", math: "187.5 h × 0.9 L/h", result: "168.8 L" },
      { label: "Cost per van", math: `168.8 L × $${DIESEL.toFixed(3)}`, result: formatAud(idleVanCost) },
      { label: "Fleet cost", math: `${formatAud(idleVanCost)} × 8`, result: formatAud(idleVanCost * 8) },
    ],
    answer: `${formatAud(idleVanCost)} per van per year, ${formatAud(idleVanCost * 8)} across the fleet.`,
    takeaway:
      "Idling produces zero kilometres, so this is pure waste rather than an efficiency loss — and it does not appear as a line item anywhere. It also accrues engine hours that pull services forward, which is usually a larger number than the fuel itself.",
  },

  "carpool-fuel-split-calculator": {
    scenario:
      "Four colleagues share a commute. Three do the full 84 km round trip; the fourth is picked up part-way and covers 50 km of it. They want a split nobody can argue with.",
    inputs: [
      { label: "Round trip", value: "84 km" },
      { label: "Fuel economy", value: "7.9 L/100km" },
      { label: "Fuel price", value: `$${PETROL.toFixed(3)}/L` },
      { label: "Full-distance riders", value: "3" },
      { label: "Part-distance rider", value: "1 × 50 km" },
    ],
    steps: [
      { label: "Daily fuel", math: "84 ÷ 100 × 7.9 L", result: "6.64 L" },
      { label: "Daily cost", math: `6.64 L × $${PETROL.toFixed(3)}`, result: formatAud(carpoolDaily, 2) },
      { label: "Passenger-kilometres", math: "(3 × 84) + 50", result: "302 pax-km" },
      { label: "Rate", math: `${formatAud(carpoolDaily, 2)} ÷ 302`, result: `${formatAud(carpoolRate, 4)}/pax-km` },
    ],
    answer: `${formatAud(carpoolRate * 84, 2)} a day each for the three full-distance riders and ${formatAud(carpoolRate * 50, 2)} for the part-distance rider.`,
    takeaway:
      "Splitting by passenger-kilometre rather than by head is what makes a partial leg fair, and it stops the arrangement collapsing the first time someone's route changes. Agree once whether the driver pays a share — that is a social question, not an arithmetic one — and revisit the figures when fuel moves more than about 10%.",
  },



  "generator-fuel-calculator": {
    scenario:
      "A rural property owner sizes fuel storage for a 6 kW diesel generator that runs the house essentials during outages, typically at about half load for twelve hours a day.",
    inputs: [
      { label: "Generator rating", value: "6 kW" },
      { label: "Applied load", value: "50% (3 kW)" },
      { label: "Fuel model", value: "0.035 L/h per rated kW + 0.265 L per kWh (Able Power chart fit)" },
      { label: "Run time", value: "12 h/day for 3 days" },
      { label: "Fuel price", value: `$${DIESEL.toFixed(3)}/L` },
    ],
    steps: [
      { label: "Engine running cost", math: "0.035 × 6 kW", result: "0.21 L/h" },
      { label: "Per kWh delivered", math: "0.265 × 3 kW", result: "0.80 L/h" },
      { label: "Hourly burn", math: "0.21 + 0.80 L/h", result: `${generatorLph.toFixed(2)} L/h` },
      { label: "Fuel for 36 hours", math: `${generatorLph.toFixed(2)} L/h × 36 h`, result: `${(generatorLph * 36).toFixed(1)} L` },
      { label: "Cost", math: `${(generatorLph * 36).toFixed(1)} L × $${DIESEL.toFixed(3)}`, result: formatAud(generatorCost) },
    ],
    answer: `About ${generatorLph.toFixed(2)} litres an hour — ${(generatorLph * 36).toFixed(1)} litres and ${formatAud(generatorCost)} for a three-day outage at twelve hours a day.`,
    takeaway:
      "Storage sizing should assume worse than this. Light loads are disproportionately inefficient — at a quarter load this generator still burns well over half its half-load fuel — so two 20-litre jerry cans is the honest minimum for a three-day plan, and stored diesel needs rotating before it degrades.",
  },


  "hydrogen-vs-gas-calculator": {
    scenario:
      "A fleet manager in Geelong assessing whether a hydrogen fuel-cell passenger car makes financial sense today against a petrol equivalent, at 15,000 km a year, refuelling at Viva Energy's public station.",
    inputs: [
      { label: "Hydrogen use", value: "1.05 kg/100 km (5 kg ≈ 475 km)" },
      { label: "Hydrogen price", value: "$33/kg (Viva Energy, incl. GST)" },
      { label: "Petrol economy", value: "7.5 L/100km" },
      { label: "Fuel price", value: `$${PETROL.toFixed(3)}/L` },
      { label: "Annual distance", value: "15,000 km" },
    ],
    steps: [
      { label: "Hydrogen per 100 km", math: "1.05 kg × $33", result: formatAud(h2Per100, 2) },
      { label: "Petrol per 100 km", math: `7.5 L × $${PETROL.toFixed(3)}`, result: formatAud(hydrogenPetrolPer100, 2) },
      { label: "Annual hydrogen", math: `150 × ${formatAud(h2Per100, 2)}`, result: formatAud(h2Annual) },
      { label: "Annual petrol", math: `150 × ${formatAud(hydrogenPetrolPer100, 2)}`, result: formatAud(hydrogenPetrolAnnual) },
    ],
    answer: `Hydrogen costs ${formatAud(h2Annual - hydrogenPetrolAnnual)} a year more than petrol at these prices — about ${Math.round(((h2Annual - hydrogenPetrolAnnual) / hydrogenPetrolAnnual) * 100)}% dearer per kilometre.`,
    takeaway:
      "Energy cost is not the binding constraint anyway. CSIRO's HyResource list shows only two hydrogen stations described as open to the public — Brisbane (bp Lytton) and Geelong (Viva Energy) — so for most fleets refuelling access rules the technology out before the price does.",
  },


  "fuel-surcharge-calculator": {
    scenario:
      "A shipper is checking a carrier's per-km fuel levy on an 880 km linehaul. The contract sets a $1.50/L diesel base price and a fuel use figure of 36 L/100km; the base rate is $2,500.",
    inputs: [
      { label: "Contract base diesel", value: "$1.50/L" },
      { label: "Current diesel", value: `$${DIESEL.toFixed(3)}/L (ACCC five-city average)` },
      { label: "Truck fuel use", value: "36 L/100km" },
      { label: "Trip distance", value: "880 km" },
      { label: "Base rate", value: "$2,500" },
    ],
    steps: [
      { label: "Price gap", math: `$${DIESEL.toFixed(3)} − $1.50`, result: `$${(DIESEL - 1.5).toFixed(3)}/L` },
      { label: "Levy per km", math: `$${(DIESEL - 1.5).toFixed(3)} × 36 ÷ 100`, result: `$${(((DIESEL - 1.5) * 36) / 100).toFixed(3)}/km` },
      { label: "Total levy", math: `$${(((DIESEL - 1.5) * 36) / 100).toFixed(3)} × 880 km`, result: formatAud(((DIESEL - 1.5) * 36 * 880) / 100) },
      { label: "Invoice total", math: `$2,500 + ${formatAud(((DIESEL - 1.5) * 36 * 880) / 100)}`, result: formatAud(2500 + ((DIESEL - 1.5) * 36 * 880) / 100) },
    ],
    answer: `${formatAud(((DIESEL - 1.5) * 36 * 880) / 100)} of fuel levy on this run — ${((((DIESEL - 1.5) * 36 * 880) / 100 / 2500) * 100).toFixed(1)}% on top of the base rate.`,
    takeaway:
      "The two levers worth checking in any levy dispute are the base price and the fuel use figure. A base price set when diesel was much cheaper produces a permanently large levy, and a fuel figure a few L/100km too high quietly inflates every invoice. Both are negotiable at renewal; the diesel price is not.",
  },



};
