import { kmp } from "../kmp";

describe("kmp test", () => {
    it("should find word position in given text", () => {
        expect(kmp(null, null)).toBe(-1);
        expect(kmp(null, undefined)).toBe(-1);
        expect(kmp("aaa", null)).toBe(-1);
        expect(kmp("aaa", undefined)).toBe(-1);
        expect(kmp("", "")).toBe(0);
        expect(kmp("a", "")).toBe(0);
        expect(kmp("a", "a")).toBe(0);
        expect(kmp("abcbcglx", "abca")).toBe(-1);
        expect(kmp("abcbcglx", "bcgl")).toBe(3);
        expect(kmp("abcxabcdabxabcdabcdabcy", "abcdabcy")).toBe(15);
        expect(kmp("abcxabcdabxabcdabcdabcy", "abcdabca")).toBe(-1);
        expect(kmp("abcxabcdabxaabcdabcabcdabcdabcy", "abcdabca")).toBe(12);
        expect(kmp("abcxabcdabxaabaabaaaabcdabcdabcy", "aabaabaaa")).toBe(11);
    });
});
