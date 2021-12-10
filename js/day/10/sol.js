export const solve = [[part1, "example", "input"], [part2, "example", "input"]];
function parse(text) {
    return text.split("\n").filter(v => v);
}
const points = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
};
const brackets = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">"
};
function part1({ input_str }) {
    const input = parse(input_str);
    let tot = 0;
    for (const line of input) {
        let stack = [];
        for (const char of line) {
            const end = brackets[char];
            if (end) {
                stack.push(end);
            }
            else if (char !== stack.pop()) {
                tot += points[char];
                break;
            }
        }
    }
    return tot;
}
const points2 = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
};
function part2({ input_str }) {
    const input = parse(input_str);
    const scores = [];
    outer: for (const line of input) {
        let stack = [];
        for (const char of line) {
            const end = brackets[char];
            if (end) {
                stack.push(end);
            }
            else if (char !== stack.pop()) {
                continue outer;
            }
        }
        if (stack.length > 0) {
            const score = stack.reduceRight((a, v) => a * 5 + points2[v], 0);
            scores.push(score);
        }
    }
    return scores.sort((a, b) => a - b)[0 | scores.length / 2];
}
//# sourceMappingURL=sol.js.map