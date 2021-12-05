import { lazy_canvas } from "../../util.js";
export const solve = [[part1, "example", "input"], [part2, "example", "input"]];
function parse(text) {
    return text.split("\n").filter(v => v).map(v => parseInt(v));
}
function part1({ input_str, html }) {
    const input = parse(input_str);
    html.appendChild(button(input, false));
    return count(input);
}
function part2({ input_str, html }) {
    const input = parse(input_str);
    html.appendChild(button(input, true));
    return count(slide(input));
}
function count(input) {
    let cnt = 0;
    for (let i = 1; i < input.length; i++) {
        if (input[i] > input[i - 1]) {
            cnt++;
        }
    }
    return cnt;
}
function slide(vals) {
    const output = [];
    for (let i = 2; i < vals.length; i++) {
        output[i - 2] = vals[i - 2] + vals[i - 1] + vals[i];
    }
    return output;
}
function button(heights, do_slide) {
    // const button = l("button", {onclick: ()=>{
    //     const canvas = draw_line(heights, do_slide)
    //     button.replaceWith(canvas);
    // }}, "Animate");
    return lazy_canvas({ btn_text: "Animate", summary: "Animation", update: draw_line(heights, do_slide), width: 500, height: 500 });
}
const duration = 5000;
function draw_line(heights, do_slide) {
    const s = do_slide ? slide(heights) : undefined;
    let start = performance.now();
    function update(ctx, t) {
        const { width: w, height: h } = ctx.canvas;
        const x = Math.min(1, ((t - start) / duration) % 1.25);
        const hs = do_slide ? s : heights;
        const i = Math.min(hs.length, 0 | x * (hs.length + 1));
        const c = count(hs.slice(0, i));
        lines(ctx, w, h, heights, s);
        ctx.fillStyle = "black";
        ctx.strokeStyle = "red";
        ctx.font = "20px solid";
        ctx.textAlign = "right";
        ctx.beginPath();
        ctx.moveTo(x * w, 0);
        ctx.lineTo(x * w, h);
        ctx.stroke();
        ctx.fillText(`${c}/${i}`, x * w, h / 2);
        return true;
    }
    return update;
}
function lines(ctx, w, h, heights, s) {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "blue";
    line(ctx, w, h, heights);
    if (s) {
        ctx.strokeStyle = "black";
        line(ctx, w, h, s);
    }
}
function line(ctx, w, h, heights) {
    const max = Math.max(...heights);
    ctx.beginPath();
    heights.forEach((v, i) => {
        const x = i * w / (heights.length - 1);
        const y = v * h / max;
        ctx.lineTo(x, y);
    });
    ctx.stroke();
}
//# sourceMappingURL=sol.js.map