import { l } from "../../l.js";

export const solve: Solve = [[part1,"example", "input"], [part2,"example", 'input']];

const w = 1024, h = w;

function parse(text:string){
    const input = text.split("\n").filter(v=>v).map(line=>
        line.split(/\D+/).map(v => parseInt(v))
    ) as [x1: number, y1: number, x2: number, y2: number][];
    const max = Math.max(...input.flat());
    return {input, max}
}

function part1({input_str, html}: Context){
    const {input, max} = parse(input_str);
    let count = 0
    const grid = new Int32Array(w*h);
    for (const [x1, y1, x2, y2] of input){
        if (x1 == x2)for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++){
            if ((grid[x1 + y * w] += 1) === 2){
                count++;
            }
        }
        if (y1 == y2)for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++){
            if ((grid[x + y1 * w] += 1) === 2){
                count++;
            }
        }
    }
    add_render_button(html, grid, 0, 0, max+1, max+1);
    return count;
}

function part2( {input_str, html}: Context){
    const {input, max} = parse(input_str);
    let count = 0;
    const grid = new Int32Array(w*h);
    for (const [x1, y1, x2, y2] of input){
        const dx = Math.sign(x2 - x1);
        const dy = Math.sign(y2 - y1);
        let x = x1, y = y1
        for (; x !== x2 || y !== y2; x += dx, y += dy){
            if ((grid[x + y * w] += 1) === 2){
                count++;
            }
        }
        if ((grid[x + y * w] += 1) === 2){
            count++;
        }
    }
    add_render_button(html, grid, 0, 0, max+1, max+1);
    return count;
}

function add_render_button(html: HTMLElement, grid: Int32Array, ox: number, oy: number, w: number, h: number){
    const button = document.createElement("button");
    button.textContent = "render grid";
    button.onclick = () => {
        const details = l("details",
            {open: true},
            l("summary", {}, "grid"),
            draw_canvas(grid, oy, oy, w, h),
        ) ;
        html.removeChild(button);
        html.appendChild(details);
    }
    html.appendChild(button);
}

function draw_canvas(grid: Int32Array, ox: number, oy: number, w: number, h: number): HTMLCanvasElement {
    const canvas = l("canvas", {width: w, height: h});
    const ctx = canvas.getContext("2d");
    if (ctx === null){throw new Error("unable to get canvas");}
    draw_grid(ctx, grid, ox, oy);
    return canvas;
}

function draw_grid(ctx: CanvasRenderingContext2D, grid: Int32Array, ox: number, oy: number) {
    const {width, height} = ctx.canvas;
    const img = ctx.createImageData(width, height);
    const data = img.data;
    const ex = ox + width, ey = oy + height;
    for (let y = oy; y < ey; y++){
        for (let x = ox; x < ex; x++){
            const val = grid[x + y * w];
            if (val === 0){
                data.set([0,0,0,255], (x + y * width) * 4);
            } else if (val === 1){
                data.set([32,32,32,255], (x + y * width) * 4);
            } else {
                data.set([255,255,255,255], (x + y * width) * 4);
            }
        }
    }
    ctx.putImageData(img, 0, 0);
}