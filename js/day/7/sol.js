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
function cost(groups, x) {
    return sum(groups.map((v, i) => {
        const a = Math.abs(i - x);
        return v * a * (a + 1) / 2;
    }));
}
function part2({ input_str }) {
    console.time("part2");
    const input = parse(input_str);
    const groups = group(input);
    let start = 0, end = groups.length;
    let min_cost = 0;
    while (start < end - 1) {
        const guess = 0 | (start + end) / 2;
        const c1 = cost(groups, guess);
        const c2 = cost(groups, guess + 1);
        if (c1 > c2) {
            start = guess;
            min_cost = c2;
        }
        else {
            end = guess;
            min_cost = c1;
        }
    }
    console.timeEnd("part2");
    return min_cost;
}
//# sourceMappingURL=sol.js.map