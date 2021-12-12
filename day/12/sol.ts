export const solve: Solve = [[part1, "small", "example", "big", "input"], [part2,"small", "input"]];

const start = 0, end = 1;

function parse(text:string){
    const name_num: Record<string, number> = {start, end};
    const num_name: Record<number, string> = ["start", "end"];
    const connections: number[][] = [];
    const small: boolean[] = [true,true];
    let cnt = 2;
    text.split("\n").filter(v=>v).forEach(line =>{
        const [left, right] = line.split("-").map(num);
        (connections[left] ??= []).push(right);
        (connections[right] ??= []).push(left);
    }   
    );
    connections[end] = [];
    for (const conn of connections){
        conn.sort((a,b)=>a-b);
        const i = conn.indexOf(start);
        if (i >= 0){
            conn.splice(i, 1);
        }
    }
    return {name_num, num_name, connections, small}
    function num(name: string){
        let num = name_num[name];
        if (num !== undefined){
            return num;
        }
        num = cnt++;
        name_num[name] = num;
        num_name[num] = name;
        small[num] = name.toLowerCase() === name;
        return num;
    }
}
enum Trace {
    Back = -1, Stop = -2
}

function trace_back(){
    let stack: number[] = [];
    let current = 0;
    return next;
    function next(num_choices: number): number | Trace.Back | Trace.Stop {
        if (current >= num_choices){
            if (stack.length === 0){
                return Trace.Stop;
            }
            current = stack.pop();
            return Trace.Back;
        }
        const out = current;
        stack.push(current + 1);
        current = 0;
        return out;
    }
}

const max_loop = 5_000_000;

function part1({input_str}: Context){
    const {connections, small} = parse(input_str);
    let cave = start;
    let path_cnt = 0;
    let path: number[] = [];
    const visited: number[] = [];
    const trace = trace_back();
    let i = 0;
    for (; i < max_loop; i++){
        if (cave === end){
            path_cnt++
        }
        const nexts = connections[cave] ?? [];
        const next_i = trace((small[cave] && visited[cave] > 0) ? 0 : nexts.length);
        visited[cave] ??= 0
        if (next_i === Trace.Back){
            cave = path.pop();
            visited[cave]--;
            continue;
        }
        if (next_i === Trace.Stop){
            break
        }
        visited[cave]++;
        path.push(cave);
        cave = nexts[next_i];
    }
    if (i >= max_loop){
        return `Infinite loop at count ${path_cnt}`;
    }
    return path_cnt;
}

function part2( {input_str}: Context){
    const {connections, small} = parse(input_str);
    let cave = start;
    let path_cnt = 0;
    let path: number[] = [];
    const visited: number[] = [];
    const trace = trace_back();
    let visited_small_2x = false;
    let i = 0;
    for (; i < max_loop; i++){
        if (cave === end){
            path_cnt++
        }
        const nexts = connections[cave] ?? [];
        const next_i = trace((small[cave] && visited[cave] > (visited_small_2x ? 0 : 1)) ? 0 : nexts.length);
        visited[cave] ??= 0
        if (next_i === Trace.Back){
            cave = path.pop();
            visited[cave]--;
            if (small[cave] && visited[cave] == 1){
                visited_small_2x = false;
            }
            continue;
        }
        if (next_i === Trace.Stop){
            break
        }
        visited[cave]++;
        if (small[cave] && visited[cave] == 2){
            visited_small_2x = true
        }
        path.push(cave);
        cave = nexts[next_i];
    }
    if (i >= max_loop){
        return `Infinite loop at count ${path_cnt}`;
    }
    return path_cnt;
}
