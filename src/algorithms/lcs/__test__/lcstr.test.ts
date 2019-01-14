import {lcstr , lcstropt} from "../lcstr";

describe("longestCommonSubstring", () => {
  it("should find longest common substring between two strings", () => {
    expect(lcstr("", "")).toBe("");
    expect(lcstr("ABC", "")).toBe("");
    expect(lcstr("", "ABC")).toBe("");
    expect(lcstr("ABABC", "BABCA")).toBe("BABC");
    expect(lcstr("BABCA", "ABCBA")).toBe("ABC");
    expect(lcstr(
      "Algorithms and data structures implemented in JavaScript",
      "Here you may find Algorithms and data structures that are implemented in JavaScript"
    )).toBe("Algorithms and data structures ");
  });

  it("should handle unicode correctly", () => {
    expect(lcstr("^^**ABC", "^^--ABC")).toBe("ABC");
    expect(lcstr("^^**A", "^^--A")).toBe("^^");
    expect(lcstr("A买B时", "买B时GD")).toBe("买B时");
    expect(lcstr("After test买时 case", "another_test买时")).toBe("test买时");
  });
});

describe("longestCommonSubstring optimize", () => {
  it("should find longest common substring between two strings", () => {
    expect(lcstropt("", "")).toBe("");
    expect(lcstropt("ABC", "")).toBe("");
    expect(lcstropt("", "ABC")).toBe("");
    expect(lcstropt("ABABC", "BABCA")).toBe("BABC");
    expect(lcstropt("BABCA", "ABCBA")).toBe("ABC");
    expect(lcstropt(
      "Algorithms and data structures implemented in JavaScript",
      "Here you may find Algorithms and data structures that are implemented in JavaScript"
    )).toBe("Algorithms and data structures ");
  });

  it("should handle unicode correctly", () => {
    expect(lcstropt("^^**ABC", "^^--ABC")).toBe("ABC");
    expect(lcstropt("^^**A", "^^--A")).toBe("^^");
    expect(lcstropt("A买B时", "买B时GD")).toBe("买B时");
    expect(lcstropt("After test买时 case", "another_test买时")).toBe("test买时");
  });
});
