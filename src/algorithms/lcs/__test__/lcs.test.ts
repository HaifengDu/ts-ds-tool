import { lcs } from "../lcs";

describe("lcs test", () => {
   it("should find position in string" , () => {

    expect(lcs("", "")).toEqual("");

    expect(lcs("", "ABC")).toEqual("");

    expect(lcs("ABC" , "")).toEqual("");

    expect(lcs(
      "ABC",
      "DEFG"
    )).toEqual("");

    expect(lcs(
      "ABCDGH",
      "AEDFHR"
    )).toEqual("ADH");

    expect(lcs(
      "AGGTAB",
      "GXTXAYB"
    )).toEqual("GTAB");

    expect(lcs(
      "ABCDAF",
      "ACBCF"
    )).toEqual("ABCF");
   });
});
