import { lcm } from "../lcm";

describe("lcm test", () => {
    it("lcm in one zero", () => {
        expect(lcm(10, 0)).toBe(0);
        expect(lcm(0, 10)).toBe(0);
    });

    it("lcm in two number", () => {
        expect(lcm(4, 6)).toBe(12);
        expect(lcm(12, 6)).toBe(12);
    });
});
