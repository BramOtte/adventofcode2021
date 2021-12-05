import { lazy_canvas } from "../../util.js";
export const solve = [[part1, "example", "input"], [part2, "example", "input"]];
function parse(text) {
    return text.split("\n")
        .filter(v => v)
        .map(v => {
        const [dir, size] = v.split(" ");
        return { dir, size: parseInt(size) };
    });
}
function part1({ input_str, html }) {
    const input = parse(input_str);
    let x = 0, y = 0;
    const states = [];
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
        states.push({ x, y });
    }
    html.appendChild(button(states));
    return x * y;
}
function part2({ input_str, html }) {
    const input = parse(input_str);
    let x = 0, y = 0, aim = 0;
    const states = [];
    for (const { dir, size } of input) {
        switch (dir) {
            case "forward":
                x += size;
                y += aim * size;
                break;
            case "down":
                aim += size;
                break;
            case "up":
                aim -= size;
                break;
        }
        states.push({ x, y, aim });
    }
    html.appendChild(button(states));
    return x * y;
}
const duration = 10000;
function button(states) {
    const max_x = Math.max(...states.map(v => v.x));
    const max_y = Math.max(...states.map(v => v.y));
    const max = Math.max(max_x, max_y);
    const avg_aim = states.reduce((a, v) => a + v.aim, 0) / states.length;
    // const max_aim = Math.max(...states.map(v=>v.aim??0));
    // const max = Math.max(...states.map(({x, y}) => Math.max(x, y)));
    const w = 500, h = 500;
    const sx = (w - 10) / max_x, sy = (h - 10) / max_y;
    const start = performance.now();
    return lazy_canvas({ width: w, height: h, btn_text: "Animate", summary: "Animation", update, on_btn });
    function on_btn(ctx) {
        ctx.font = "30px solid";
        ctx.textAlign = "center";
        ctx.strokeStyle = "red";
    }
    function update(ctx, time) {
        const t = Math.min(states.length, ((time - start) * (states.length) / duration) % states.length * 1.25);
        const i = 0 | t;
        const a = t - i;
        let { x, y, aim } = i == 0 ? { x: 0, y: 0, aim: 0 } : states[i - 1];
        if (a !== 0) {
            const { x: x2, y: y2, aim: a2 } = states[i];
            x = x + (x2 - x) * a;
            y = y + (y2 - y) * a;
            aim = aim + (a2 - aim) * a;
        }
        ctx.fillStyle = "lightblue";
        ctx.fillRect(0, 0, w, h);
        const x2 = x + max / (avg_aim * 2);
        const y2 = y + max * aim / (avg_aim * 2);
        ctx.beginPath();
        ctx.moveTo(x * sx + 5.5, y * sy + 5.5);
        ctx.lineTo(x2 * sx + 5.5, y2 * sy + 5.5);
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.fillRect(x * sx, y * sy, 10, 10);
        const o = x * y;
        ctx.fillText(`${x.toFixed(0)} * ${y.toFixed(0)} = ${o.toFixed(0)}`, w / 2, h - 10);
        return true;
    }
}
//# sourceMappingURL=sol.js.map