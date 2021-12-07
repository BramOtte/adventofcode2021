import { sum } from "../../util.js";
export const solve = [[part1, "example", "input"], [part2, "example", "input"]];
function parse(text) {
    return text.split(",").map(v => parseInt(v));
}
function group(input) {
    const groups = [];
    for (const crab of input) {
        groups[crab] = (groups[crab] ?? 0) + 1;
    }
    return groups;
}
function part1({ input_str }) {
    const input = parse(input_str);
    const groups = group(input);
    let left = 0, left_cnt = 0;
    let right = sum(input), right_cnt = input.length;
    let x = 0;
    let last = right;
    for (; x < groups.length; x++) {
        const count = groups[x] ?? 0;
        left_cnt += count;
        right_cnt -= count;
        left += left_cnt;
        right -= right_cnt;
        const cost = left + right;
        if (last < cost) {
            return last;
        }
        last = cost;
    }
    return undefined;
}
function cost(input, x) {
    return sum(input.map(v => {
        const a = Math.abs(v - x);
        return a * (a + 1) / 2;
    }));
}
function part2({ input_str }) {
    const input = parse(input_str);
    const max = Math.max(...input);
    let xs = [];
    for (let x = 0; x <= max; x++) {
        xs.push(x);
    }
    return Math.min(...Array.from({ length: max - 1 }, (_, x) => cost(input, x)));
}
//# sourceMappingURL=sol.js.map