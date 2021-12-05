import { lazy_canvas } from "../../util.js";
export const solve = [
    [part1, "example", "input"], [part2, "example", "input"],
    // [p1,"example", "input"], [p2,"example", "input"]
];
const w = 1024, h = w;
function parse(text) {
    const input = text.split("\n").filter(v => v).map(line => line.split(/\D+/).map(v => parseInt(v)));
    const max = Math.max(...input.flat());
    return { input, max };
}
function part1({ input_str, html }) {
    const { input, max } = parse(input_str);
    let count = 0;
    const grid = new Int32Array(w * h);
    for (const [x1, y1, x2, y2] of input) {
        if (x1 == x2)
            for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                if ((grid[x1 + y * w] += 1) === 2) {
                    count++;
                }
            }
        if (y1 == y2)
            for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
                if ((grid[x + y1 * w] += 1) === 2) {
                    count++;
                }
            }
    }
    html.appendChild(add_render_button(grid, 0, 0, max + 1, max + 1));
    return count;
}
function part2({ input_str, html }) {
    const { input, max } = parse(input_str);
    let count = 0;
    const grid = new Int32Array(w * h);
    for (const [x1, y1, x2, y2] of input) {
        const dx = Math.sign(x2 - x1);
        const dy = Math.sign(y2 - y1);
        let x = x1, y = y1;
        for (; x !== x2 || y !== y2; x += dx, y += dy) {
            if ((grid[x + y * w] += 1) === 2) {
                count++;
            }
        }
        if ((grid[x + y * w] += 1) === 2) {
            count++;
        }
    }
    html.appendChild(add_render_button(grid, 0, 0, max + 1, max + 1));
    return count;
}
function p1({ input_str: t }) {
    let w = 1024, g = new Int8Array(w * w), c = 0, s = Math.sign, a, b;
    t.split("\n").map(line => line.split(/\D+/).map(v => parseInt(v))).map(([x, y, X, Y]) => { for (a = s(X - x), b = s(Y - y); (!a || !b) && x ^ X + a | y ^ Y + b; ++g[x + y * w] == 2 && c++, x += a, y += b)
        ; });
    return c;
}
function p2({ input_str: t }) {
    let w = 1024, g = new Int8Array(w * w), c = 0, s = Math.sign, a, b;
    t.split("\n").map(line => line.split(/\D+/).map(v => parseInt(v))).map(([x, y, X, Y]) => { for (a = s(X - x), b = s(Y - y); x ^ X + a | y ^ Y + b; ++g[x + y * w] == 2 && c++, x += a, y += b)
        ; });
    return c;
}
function add_render_button(grid, ox, oy, w, h) {
    return lazy_canvas({
        btn_text: "Render Grid", summary: "Grid",
        width: w, height: h, on_btn: (ctx) => draw_grid(ctx, grid, ox, oy)
    });
}
function draw_grid(ctx, grid, ox, oy) {
    const { width, height } = ctx.canvas;
    const img = ctx.createImageData(width, height);
    const data = img.data;
    const ex = ox + width, ey = oy + height;
    for (let y = oy; y < ey; y++) {
        for (let x = ox; x < ex; x++) {
            const val = grid[x + y * w];
            if (val === 0) {
                data.set([0, 0, 0, 255], (x + y * width) * 4);
            }
            else if (val === 1) {
                data.set([32, 32, 32, 255], (x + y * width) * 4);
            }
            else {
                data.set([255, 255, 255, 255], (x + y * width) * 4);
            }
        }
    }
    ctx.putImageData(img, 0, 0);
}
//# sourceMappingURL=sol.js.map