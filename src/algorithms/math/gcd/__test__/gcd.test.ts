import { gcd } from "../gcd";
describe("gcd test", () => {
    it("gcd in one zero", () => {
        expect(gcd(10, 0)).toBe(10);
        expect(gcd(0, 10)).toBe(10);
    });

    it("gcd in two number", () => {
        expect(gcd(9, 6)).toBe(3);
        expect(gcd(12, 6)).toBe(6);
    });
});
