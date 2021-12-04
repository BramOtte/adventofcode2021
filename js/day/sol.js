export const solve = [
    part1.bind(null, "example"), part1.bind(null, "input"),
    part2.bind(null, "example"), part2.bind(null, "input"),
];
async function parse(url) {
    const text = await fetch(`day/1/${url}.txt`).then(res => res.text());
    return text.replaceAll("\r", "").split("\n").map(v => parseInt(v));
}
async function part1(src, { html }) {
    const input = await parse(src);
}
async function part2(src, { html }) {
    const input = await parse(src);
}
//# sourceMappingURL=sol.js.map