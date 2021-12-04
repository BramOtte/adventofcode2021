export const solve = [part1, part2];
async function parse(url) {
    const text = await fetch(`days/2/${url}.txt`).then(res => res.text());
    return text.replaceAll("\r", "").split("\n")
        .filter(v => v)
        .map(v => {
        const [dir, size] = v.split(" ");
        return { dir, size: parseInt(size) };
    });
}
async function part1() {
    const e = await parse("example");
    console.log(e, solve1(e));
    const i = await parse("input");
    console.log(i, solve1(i));
}
async function part2() {
    const e = await parse("example");
    console.log(e, solve2(e));
    const i = await parse("input");
    console.log(i, solve2(i));
}
function solve1(input) {
    let x = 0, y = 0;
    for (const { dir, size } of input) {
        switch (dir) {
            case "forward":
                x += size;
                break;
            case "up":
                y -= size;
                break;
            case "down":
                y += size;
                break;
        }
    }
    return x * y;
}
function solve2(input) {
    let x = 0, y = 0, a = 0;
    for (const { dir, size } of input) {
        switch (dir) {
            case "forward":
                x += size;
                y += a * size;
                break;
            case "down":
                a += size;
                break;
            case "up":
                a -= size;
                break;
        }
    }
    return x * y;
}
