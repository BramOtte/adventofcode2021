export const solve = [[part1, "example", "input"], [part2, "example", "input"]];
const zero = "0".charCodeAt(0);
function parse(text) {
    const values = Array.from({ length: text.length }, (_, i) => text.charCodeAt(i) - zero).filter(v => v >= 1 && v <= 9);
    const width = text.indexOf("\n");
    const height = values.length / width;
    return { values, width, height };
}
function part1({ input_str }) {
    const { values, width: w, height: h } = parse(input_str);
    return shortest(w, h, values, 0, 0, w - 1, h - 1);
}
function shortest(w, h, values, sx, sy, ex, ey) {
    const start = P(sx, sy), end = P(ex, ey);
    const costs = new Int32Array(values.length);
    let search = [start];
    while (search.length > 0) {
        const next = [];
        for (const p of search) {
            const from = costs[p];
            if (X(p) > 0)
                check(next, p - 1, from);
            if (X(p) + 1 < w)
                check(next, p + 1, from);
            if (Y(p) > 0)
                check(next, p - w, from);
            if (Y(p) + 1 < h)
                check(next, p + w, from);
        }
        search = next;
    }
    return costs[end];
    function check(next, p, from) {
        const old = costs[p];
        const c = from + values[p];
        if (old === 0) {
            next.push(p);
            costs[p] = c;
        }
        else if (c < old) {
            next.push(p);
            costs[p] = c;
        }
    }
    function P(x, y) {
        return x + y * w;
    }
    function X(p) {
        return p % w;
    }
    function Y(p) {
        return 0 | p / w;
    }
}
function part2({ input_str }) {
    const { values, width: w, height: h } = parse(input_str);
    const BW = 5, BH = 5;
    const W = w * BW, H = h * BH;
    const repeat = new Uint32Array(values.length * 25);
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = x + y * w;
            const val = values[i];
            for (let by = 0; by < BH; by++) {
                for (let bx = 0; bx < BW; bx++) {
                    const j = x + bx * w + (y + by * h) * W;
                    repeat[j] = ((val + by + bx - 1) % 9) + 1;
                }
            }
        }
    }
    return shortest(W, H, repeat, 0, 0, W - 1, H - 1);
}
//# sourceMappingURL=sol.js.map