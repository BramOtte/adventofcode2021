export const solve: Solve = [[part1,"example", "input"], [part2,"example", "input"]];

enum Axis {
    x, y
}

function parse(text:string){
    const [top, bot] = text.split("\n\n");
    const points = top.split("\n").map(line => line.split(",").map(v=>parseInt(v)));
    const folds = bot.split("\n").filter(v=>v).map(line => {
        const eq_index = line.indexOf("=");
        const axis = line[eq_index-1] === "x" ? Axis.x : Axis.y;
        const value = parseInt(line.substring(eq_index+1));
        return {axis, value};
    });
    return {points, folds};
}

function part1({input_str}: Context){
    const {points, folds} = parse(input_str);
    for (const {axis, value} of folds){
        for (const point of points){
            if (point[axis] >= value){
                point[axis] = value*2 - point[axis];
            }
        }
        break;
    }
    const dots = new Set<number>();
    for (const p of points){
        dots.add(p[0] + (p[1] << 16));
    }
    return dots.size;

}

function part2( {input_str}: Context){
    const {points, folds} = parse(input_str);
    for (const {axis, value} of folds){
        for (const point of points){
            if (point[axis] >= value){
                point[axis] = value*2 - point[axis];
            }
        }
    }
    let rows: boolean[][] = Array.from({length: 6}, ()=>Array.from({length: 45}, ()=>false));
    for (const p of points){
        (rows[p[1]] ??= [])[p[0]] = true;
    }
    return rows.map(vs=>vs.map(v=>v?"#":"-").join("")).join("\n")
}
