import { gcd } from "../gcd/gcd";
export function lcm(num1, num2) {
    const gcdResult = gcd(num1, num2);
    return gcdResult * (num1 / gcdResult) * (num2 / gcdResult);
}
