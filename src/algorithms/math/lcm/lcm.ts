import {gcd} from "../gcd/gcd";

export function lcm(num1: number, num2: number){
    const gcdResult = gcd(num1, num2);
    return gcdResult * (num1 / gcdResult) * (num2 / gcdResult);
}
