import formatUnits from "./formatUnits";

describe("formatUnits", () => {
  it("should format units correctly", () => {
    expect(formatUnits(BigInt(1000000000))).toBe("1");
    expect(formatUnits(BigInt(1000000000), { decimals: 12 })).toBe("0.001");
    expect(formatUnits(BigInt(1000000000), { fixedDecimals: 2 })).toBe("1");
    expect(
      formatUnits(BigInt(1e16), {
        decimals: 9,
        fixedDecimals: 2,
      })
    ).toBe("10000000");
  });
});
