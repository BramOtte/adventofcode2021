export const solve: Solve = [[part1,"example", "input"], [part2,"example", "input"]];

const board_side = 5
const board_size = board_side*board_side;
const marked = 1/256

function parse(text :string){
    const first_le = text.indexOf("\n");
    const draws = text.substring(0, first_le).split(",").map(v=>parseInt(v));
    const boards = text.substring(first_le).split(/\s+/).filter(v=>v).map(v=>parseInt(v));
    console.log(boards.length);
    return {draws, boards}
}

function part1({input_str}: Context){
    const {draws, boards} = parse(input_str);
    const {start, draw} = wins(draws, boards).next().value as {start: number, draw: number};
    const sum = 0| boards.slice(start, start+board_size).reduce((a, v)=>a+v, 0);
    const output = sum * draw;
    return output;
}

function part2({input_str}: Context){
    const {draws, boards} = parse(input_str);
    let last_win: {start: number, draw: number};
    for (const win of wins(draws, boards)){
        last_win = win;
    }
    const {start, draw} = last_win;
    const sum = 0| boards.slice(start, start+board_size).reduce((a, v)=>a+v, 0);
    const output = sum * draw;
    return output;
}

function* wins(draws: number[], boards: number[]){
    const won = new Set<number>();
    for (const draw of draws){
        for (let i = 0; i < boards.length; i++){
            if (boards[i] === draw){
                const j = 0| i % board_size;
                const start = i - j;
                if (won.has(start)){
                    continue;
                }
                boards[i] = marked;
                const y = 0| j / board_side;
                const x = 0| j % board_side;
                let lost = false;
                for (let x = 0; x < board_side; x++){
                    if (boards[start + x + y * board_side] !== marked){
                        lost = true; 
                        break;
                    }
                }
                if (!lost){
                    yield {start, draw};
                    won.add(start);
                    continue;
                }
                lost = false;
                for (let y = 0; y < board_side; y++){
                    if (boards[start + x + y * board_side] !== marked){
                        lost = true;
                        break;
                    }
                }
                if (!lost){
                    yield {start, draw};
                    won.add(start);
                    continue;
                }
            }
        }
    }
}
