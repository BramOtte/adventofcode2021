export const solve = [[part1, "example", "input"], [part2, "example", "input"]];
function parse(text) {
    return text.split("\n")
        .filter(v => v)
        .map(v => {
        const [dir, size] = v.split(" ");
        return { dir, size: parseInt(size) };
    });
}
function part1({ input_str }) {
    const input = parse(input_str);
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
function part2({ input_str }) {
    const input = parse(input_str);
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
//# sourceMappingURL=sol.js.map