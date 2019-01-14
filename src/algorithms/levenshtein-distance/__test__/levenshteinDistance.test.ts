import { levenshteinDistance } from "../levenshteinDistance";

describe("levenshteinDistance test", () => {
    it("calculate ok between two strings" , () => {
        const text1 = "absdcef";
        let text2 = "sb";
        expect(levenshteinDistance(text1 , text2)).toEqual(6);
        text2 = "sbc";
        expect(levenshteinDistance(text1 , text2)).toEqual(5);
    });
});
