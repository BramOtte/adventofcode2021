export const solve = [[part1, "example", "input"], [part2, "example", "input"]];
function parse(text) {
    return text.replaceAll("\r", "").split("\n").map(v => parseInt(v));
}
function part1({ input_str, html }) {
    const input = parse(input_str);
    return count(input);
}
function part2({ input_str, html }) {
    const input = parse(input_str);
    return count(slide(input));
}
function count(input) {
    let cnt = 0;
    for (let i = 1; i < input.length; i++) {
        if (input[i] > input[i - 1]) {
            cnt++;
        }
    }
    return cnt;
}
function slide(vals) {
    const output = [];
    for (let i = 2; i < vals.length; i++) {
        output[i - 2] = vals[i - 2] + vals[i - 1] + vals[i];
    }
    return output;
}
//# sourceMappingURL=sol.js.map