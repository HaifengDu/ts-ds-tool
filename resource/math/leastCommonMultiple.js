import { gcd } from "./greatestCommonDivisor";
export function lcm(num1, num2) {
    var gcdResult = gcd(num1, num2);
    return gcdResult * (num1 / gcdResult) * (num2 / gcdResult);
}
