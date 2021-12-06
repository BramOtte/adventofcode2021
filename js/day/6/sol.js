import { sum } from "../../util.js";
export const solve = [[part1, "example", "input"], [part2, "example", "input"]];
function parse(text) {
    return text.split(",").map(v => parseInt(v));
}
function group(input) {
    const days = Array.from({ length: 9 }, () => 0);
    for (const fish of input) {
        days[fish]++;
    }
    return days;
}
function simulate(input, its) {
    const days = group(input);
    for (let i = 0; i < its; i++) {
        const zero = days.shift();
        days.push(zero);
        days[6] += zero;
    }
    return sum(days);
}
function part1({ input_str }) {
    const input = parse(input_str);
    return simulate(input, 80);
}
function part2({ input_str }) {
    const input = parse(input_str);
    return simulate(input, 256);
}
//# sourceMappingURL=sol.js.map