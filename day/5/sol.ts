export const solve: Solve = [[part1,"example", "input"], [part2,"example", 'input']];

const w = 1024, h = w;

function parse(text:string){
    return text.split("\n").filter(v=>v).map(line=>
        line.split(/\D+/).map(v => parseInt(v))
    ) as [x1: number, y1: number, x2: number, y2: number][];
}

function part1({input_str}: Context){
    const input = parse(input_str);
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
    return count;
}

function part2( {input_str}: Context){
    const input = parse(input_str);
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
    return count;
}
