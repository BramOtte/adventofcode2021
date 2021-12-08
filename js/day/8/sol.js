export const solve = [[part1, "example", "input"], [part2, "example", "input"]];
function parse(text) {
    return text.split("\n").filter(v => v).map(line => line.split("|").map(side => side.split(" ").filter(v => v).map(v => v.split("").sort().join(""))));
}
const d1478 = new Map([[2, 1], [4, 4], [3, 7], [7, 8]]);
function part1({ input_str }) {
    const input = parse(input_str);
    let cnt = 0;
    for (const [_, right] of input) {
        for (const display of right) {
            if (d1478.has(display.length)) {
                cnt++;
            }
        }
    }
    return cnt;
}
const digits = [
    "abcefg", "cf", "acdeg", "acdfg", "bcdf", "abdfg", "abdefg", "acf", "abcdefg", "abcdfg"
];
function count_only(display, str) {
    let cnt = 0;
    for (let i = 0; i < display.length; i++) {
        if (str.includes(display[i])) {
            cnt++;
        }
    }
    return cnt;
}
function part2({ input_str }) {
    const input = parse(input_str);
    let tot = 0;
    for (let [left, right] of input) {
        const num_str = {};
        const str_num = {};
        for (const d of left) {
            const num = d1478.get(d.length);
            if (num === undefined) {
                continue;
            }
            num_str[num] = d;
            str_num[d] = num;
        }
        for (const d of left) {
            let digit = str_num[d];
            if (digit !== undefined) {
                num_str[digit] = d;
                str_num[d] = digit;
                continue;
            }
            const m1 = count_only(d, num_str[1]);
            const m4 = count_only(d, num_str[4]);
            const m7 = count_only(d, num_str[7]);
            digit = -1;
            if (d.length === 5 && m1 === 2 && m4 === 3 && m7 === 3) {
                digit = 3;
            }
            if (d.length === 5 && m1 === 1 && m4 === 2) {
                digit = 2;
            }
            if (d.length === 5 && m1 === 1 && m4 === 3) {
                digit = 5;
            }
            if (d.length === 6 && m1 === 1 && m4 === 3 && m7 === 2) {
                digit = 6;
            }
            if (d.length === 6 && m1 === 2 && m4 === 3 && m7 === 3) {
                digit = 0;
            }
            if (d.length === 6 && m1 === 2 && m4 === 4) {
                digit = 9;
            }
            if (digit >= 0) {
                num_str[digit] = d;
                str_num[d] = digit;
            }
        }
        tot += parseInt(right.map(d => str_num[d]).join(""));
    }
    return tot;
}
//# sourceMappingURL=sol.js.map