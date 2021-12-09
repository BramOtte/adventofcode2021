import { lazy_canvas, prod, sum } from "../../util.js";
export const solve = [[part1, "example", "input"], [part2, "example", "input"]];
const zero = "0".charCodeAt(0);
function parse(text) {
    const width = text.indexOf("\n");
    const heights = text.split("").map(v => v.charCodeAt(0) - zero).filter(v => v >= 0 && v < 10);
    return { width, heights };
}
function part1({ input_str, html }) {
    const { width: w, heights: hs } = parse(input_str);
    const h = hs.length / w;
    const output = sum(low_points(hs, w, h).map(({ x, y, z }) => (hs[x + y * w] = -1, z + 1)));
    html.appendChild(button(hs, w, h));
    return output;
}
function low_points(hs, w, h) {
    let ps = [];
    for (let i = 0; i < hs.length; i++) {
        const y = 0 | i / w;
        const x = 0 | i % w;
        const z = hs[i];
        if ((x <= 0 || hs[i - 1] > z) && (x >= w - 1 || hs[i + 1] > z) &&
            (y <= 0 || hs[i - w] > z) && (y >= h - 1 || hs[i + w] > z)) {
            ps.push({ x, y, z });
        }
    }
    return ps;
}
function part2({ input_str, html }) {
    const { width: w, heights: hs } = parse(input_str);
    const h = hs.length / w;
    const ps = low_points(hs, w, h).map(({ x, y, z }) => count(x, y, z));
    const output = prod(ps.sort((a, b) => b - a).slice(0, 3));
    html.appendChild(button(hs, w, h));
    return output;
    function count(x, y, z) {
        hs[x + y * w] = -1;
        let c = 1;
        let z2;
        if (x > 0 && (z2 = gz(x - 1, y)) > z && z2 < 9) {
            c += count(x - 1, y, z2);
        }
        if (x < w - 1 && (z2 = gz(x + 1, y)) > z && z2 < 9) {
            c += count(x + 1, y, z2);
        }
        if (y > 0 && (z2 = gz(x, y - 1)) > z && z2 < 9) {
            c += count(x, y - 1, z2);
        }
        if (y < h - 1 && (z2 = gz(x, y + 1)) > z && z2 < 9) {
            c += count(x, y + 1, z2);
        }
        return c;
    }
    function gz(x, y) {
        return hs[x + y * w];
    }
}
function button(hs, w, h) {
    return lazy_canvas({ width: w, height: h, on_btn });
    function on_btn(ctx) {
        const img = ctx.createImageData(w, h);
        const data = img.data;
        for (let i = 0; i < hs.length; i++) {
            const z = hs[i];
            if (z < 0) {
                data.set([255, 0, 0, 255], i * 4);
            }
            else {
                const v = 0 | z * 255 / 9;
                data.set([v, v, v, 255], i * 4);
            }
        }
        ctx.putImageData(img, 0, 0);
    }
}
//# sourceMappingURL=sol.js.map