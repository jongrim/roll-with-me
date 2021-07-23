import {
  getBaseDice,
  getCustomDice,
  getRollName,
  getModifier,
  getRollFromQuickString,
  makeNDice,
} from "./rolls";

let customDice = [
  { name: "Light", sides: 6, id: "light" },
  { name: "dire", sides: 2, id: "dire" },
  { name: "flame", sides: 4, id: "flame" },
];

describe("makeNDice", () => {
  test("make the count of dice and type provided", () => {
    const result = makeNDice({ count: 3, sides: 6 });
    expect(result.length).toBe(3);
    result.forEach((die) => {
      expect(die.sides).toBe(6);
      expect(die.name).toBe("D6");
      expect(die.result).toBeUndefined();
    });
  });
});

describe("getRollName", () => {
  it("pulls out the specified name if found", () => {
    expect(getRollName("foo bar")).toBe(undefined);
    expect(getRollName("as Glory Among Us")).toBe("Glory Among Us");
  });
});

describe("getModifier", () => {
  it("pulls out the modifier if found", () => {
    expect(getModifier("1d8 1d10 + 5 as Something")).toBe(5);
    expect(getModifier("1d8 1d10 - 5 as Something")).toBe(-5);
    expect(getModifier("1d8 1d10 as Something")).toBe(0);
    expect(getModifier("1d8 -3 1d10 -2 as Something")).toBe(-3);
  });
});

describe("getBaseDice", () => {
  it("pulls out the base dice", () => {
    const [first, second, third, fourth] = getBaseDice(
      "1 d6 2d8, 1 Dire 1 D 12 + 14 as Something"
    );
    expect(first).toMatchObject({
      name: "D6",
      sides: 6,
      result: undefined,
    });
    expect([second, third]).toMatchObject([
      {
        name: "D8",
        sides: 8,
        result: undefined,
      },
      {
        name: "D8",
        sides: 8,
        result: undefined,
      },
    ]);
    expect(fourth).toMatchObject({
      name: "D12",
      sides: 12,
      result: undefined,
    });
  });

  it("returns an empty array when none found", () => {
    expect(getBaseDice("1 Foo, 3 Bar as Something + 13")).toEqual([]);
  });
});

describe("getCustomDice", () => {
  it("pulls out the base dice", () => {
    const [first, second, third] = getCustomDice(
      "1 d6 1 Light, 1 Dire 2 Flame + 14 as Something",
      customDice
    );
    expect(first).toMatchObject({
      name: "Light",
      sides: 6,
      result: undefined,
    });
    expect(second).toMatchObject({
      name: "dire",
      sides: 2,
      result: undefined,
    });
    expect(third).toMatchObject({
      name: "flame",
      sides: 4,
      result: undefined,
    });
  });

  it("returns an empty array when none found", () => {
    expect(getCustomDice("1 Foo, 3 Bar as Something + 13", customDice)).toEqual(
      []
    );
  });
});

describe("getRollFromQuickString", () => {
  it("pulls out all the dice types and roll info with roll name", () => {
    expect(
      getRollFromQuickString("1 D 6, 2 Flame 1d12 + 3 as Big Roll", customDice)
    ).toMatchObject({
      modifier: 3,
      rolledBy: "",
      rollName: "Big Roll",
      dice: [
        { name: "D6", sides: 6, result: undefined },
        { name: "D12", sides: 12, result: undefined },
        { name: "flame", sides: 4, result: undefined },
        { name: "flame", sides: 4, result: undefined },
      ],
    });
  });

  it("pulls out all the dice types and roll info without roll name", () => {
    expect(
      getRollFromQuickString("1 D 6, 2 Flame 1d12 + 3 1light", customDice)
    ).toMatchObject({
      modifier: 3,
      rolledBy: "",
      rollName: "1 D6 + 1 D12 + 1 Light + 2 flame + 3",
      dice: [
        { name: "D6", sides: 6, result: undefined },
        { name: "D12", sides: 12, result: undefined },
        { name: "Light", sides: 6, result: undefined },
        { name: "flame", sides: 4, result: undefined },
        { name: "flame", sides: 4, result: undefined },
      ],
    });
  });
});
