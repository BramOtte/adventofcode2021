import { lazy_canvas, sum } from "../../util.js";
export const solve = [[part1, "example", "input"], [part2, "example", "input"]];
function parse(text) {
    return text.split(",").map(v => parseInt(v));
}
function group(input) {
    const groups = [];
    for (const crab of input) {
        groups[crab] = (groups[crab] ?? 0) + 1;
    }
    return groups;
}
function part1({ input_str, html }) {
    const input = parse(input_str);
    const groups = group(input);
    let left = 0, left_cnt = 0;
    let right = sum(input), right_cnt = input.length;
    let x = 0;
    let last = right;
    for (; x < groups.length; x++) {
        const count = groups[x] ?? 0;
        left_cnt += count;
        right_cnt -= count;
        left += left_cnt;
        right -= right_cnt;
        const cost = left + right;
        if (last < cost) {
            return last;
        }
        last = cost;
    }
    return undefined;
}
function cost(groups, x) {
    return sum(groups.map((v, i) => {
        const a = Math.abs(i - x);
        return v * a * (a + 1) / 2;
    }));
}
function part2({ input_str, html }) {
    const input = parse(input_str);
    const groups = group(input);
    let start = 0, end = groups.length;
    let min_cost = 0;
    const steps = [];
    while (start < end - 1) {
        const guess = 0 | (start + end) / 2;
        const c1 = cost(groups, guess);
        const c2 = cost(groups, guess + 1);
        if (c1 > c2) {
            steps.push([start, end, guess + 1, c2]);
            min_cost = c2;
            start = guess;
        }
        else {
            steps.push([start, end, guess, c1]);
            min_cost = c1;
            end = guess;
        }
    }
    html.appendChild(button(groups, x => cost(groups, x), steps));
    return min_cost;
}
const duration = 5000;
function button(groups, cost, steps) {
    const w = 500, h = 500;
    let costs;
    let start;
    return lazy_canvas({ width: w, height: h, on_btn, update });
    function on_btn(ctx, t) {
        ctx.lineWidth = 5;
        ctx.textAlign = "right";
        ctx.font = "40px solid";
        costs = Array.from({ length: groups.length }, (_, i) => cost(i));
        start = t;
    }
    function update(ctx, time) {
        const t = ((time - start) * steps.length / duration) % (steps.length * 1.1);
        const i = Math.min(steps.length - 1, 0 | t);
        let j = t - i;
        let [begin, end, guess, cost] = steps[i];
        const [nb, ne] = i + 1 < steps.length ? steps[i + 1] : [guess, guess];
        begin = begin + (nb - begin) * j;
        end = end + (ne - end) * j;
        function fit_x(i) {
            return i * w / (costs.length - 1);
        }
        function line(i) {
            ctx.beginPath();
            ctx.moveTo(fit_x(i), 0);
            ctx.lineTo(fit_x(i), h);
            ctx.stroke();
        }
        const min = Math.min(...costs), max = Math.max(...costs);
        ctx.fillStyle = "lightgrey";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        for (let i = 0; i < costs.length; i++) {
            const c = costs[i];
            const x = fit_x(i);
            const y = h * (c - min) / (max - min);
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        if (t <= steps.length) {
            ctx.strokeStyle = "blue";
            line(begin);
            line(end);
        }
        ctx.strokeStyle = t > steps.length ? "green" : "red";
        line(guess);
        ctx.fillStyle = "black";
        ctx.fillText(`${cost}`, h - 10, w / 4);
        return true;
    }
}
//# sourceMappingURL=sol.js.map