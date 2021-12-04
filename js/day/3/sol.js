export const solve = [[part1, "example", "input"], [part2, "example", "input"]];
function parse(text) {
    let width = text.indexOf("\n");
    const values = text.split("\n").filter(v => v).map(v => parseInt(v, 2));
    return { width: width, values };
}
function part1({ input_str }) {
    const { values, width } = parse(input_str);
    const counts = new Int32Array(width);
    for (let num of values) {
        for (let i = 0; num > 0; i++, num >>>= 1) {
            counts[i] += num & 1;
        }
    }
    const length = values.length;
    let gamma = 0;
    for (let i = 0; i < counts.length; i++) {
        const count = counts[i];
        if (count >= length / 2) {
            gamma += 1 << i;
        }
    }
    const epsilon = ~gamma & ((1 << width) - 1);
    const output = gamma * epsilon;
    return output;
}
function count_bits(values, i) {
    let count = 0;
    for (const value of values) {
        count += (value >>> i) & 1;
    }
    return count;
}
function part2({ input_str }) {
    const { values, width } = parse(input_str);
    let O2 = best_match(values, width, (c, h) => c >= h);
    let CO2 = best_match(values, width, (c, h) => c < h);
    const output = O2 * CO2;
    return output;
}
function best_match(values, width, cb) {
    let O2s = values;
    for (let i = width - 1; O2s.length > 1; i--) {
        const ones = count_bits(O2s, i);
        const match = cb(ones, O2s.length / 2);
        O2s = O2s.filter(v => {
            const bit = !!((v >>> i) & 1);
            return bit === match;
        });
    }
    return O2s[0];
}
//# sourceMappingURL=sol.js.map