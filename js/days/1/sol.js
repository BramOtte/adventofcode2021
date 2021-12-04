export const solve = [part1, part2];
async function parse(url) {
    const text = await fetch(`days/1/${url}.txt`).then(res => res.text());
    return text.replaceAll("\r", "").split("\n").map(v => parseInt(v));
}
async function part1() {
    const e = await parse("example");
    console.log(e, count(e));
    const i = await parse("input");
    console.log(i, count(i));
}
async function part2() {
    const e = await parse("example");
    console.log(e, count_s(e));
    const i = await parse("input");
    console.log(i, count_s(i));
}
function count(vals) {
    let cnt = 0;
    for (let i = 1; i < vals.length; i++) {
        if (vals[i] > vals[i - 1]) {
            cnt++;
        }
    }
    return cnt;
}
function count_s(vals) {
    return count(slide(vals));
}
function slide(vals) {
    const output = [];
    for (let i = 2; i < vals.length; i++) {
        output[i - 2] = vals[i - 2] + vals[i - 1] + vals[i];
    }
    return output;
}
console.log(import.meta.url);
