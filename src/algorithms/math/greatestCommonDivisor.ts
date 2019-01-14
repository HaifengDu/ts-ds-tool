export function gcd(num1: number, num2: number): number{
    if (num2 === 0){
        return num1;
    }
    return gcd(num2, num1 % num2);
}
