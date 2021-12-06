import { lazy_canvas, sum } from "../../util.js";
export const solve = [[part1, "example", "input"], [part2, "example", "input"]];
function parse(text) {
    return text.split(",").map(v => parseInt(v));
}
function group(input) {
    const days = Array.from({ length: 9 }, () => 0);
    for (const fish of input) {
        days[fish]++;
    }
    return days;
}
function simulate(days, its) {
    for (let i = 0; i < its; i++) {
        const zero = days.shift();
        days.push(zero);
        days[6] += zero;
    }
    return sum(days);
}
function part1({ input_str, html }) {
    const input = parse(input_str);
    const days = group(input);
    html.appendChild(button(input, 80));
    return simulate(days, 80);
}
function part2({ input_str, html }) {
    const input = parse(input_str);
    const days = group(input);
    html.appendChild(button(input, 256));
    return simulate(days, 256);
}
function button(input, its) {
    const w = 500, h = 500;
    const sy = h / (its + 1);
    const days = group(input);
    return lazy_canvas({ width: w, height: h, on_btn });
    function on_btn(ctx) {
        ctx.fillStyle = "lightblue";
        ctx.fillRect(0, 0, w, h);
        const final = simulate(days.slice(), its);
        for (let i = 0; i < its + 1; i++) {
            const total = sum(days);
            let x = 0.5 - total / (final * 2);
            let sub_tot = 0;
            for (let j = 0; j < 9; j++) {
                const delta = days[j];
                ctx.fillStyle = `#${(0 | j * 15 / 8).toString(16).repeat(3)}`;
                ctx.fillRect((x + sub_tot / final) * w, i * sy, delta * w / final, sy);
                sub_tot += delta;
            }
            simulate(days, 1);
        }
    }
}
//# sourceMappingURL=sol.js.map