export const solve: Solve = [[part1,"example", "input"], [part2,"example", "input"]];

function parse(text:string){
    const [top, bot] = text.split("\n\n");
    const elements = top;
    const rules: Record<string, string> = Object.fromEntries(bot.split("\n").filter(v=>v).map(line => line.split(" -> ")));
    return {elements, rules};
}

function part1({input_str}: Context){
    const {elements, rules} = parse(input_str);
    let state = elements;
    for (let j = 0; j < 10; j++){
        let next = "";
        for (let i = 0; i < state.length - 1; i++){
            next += state[i] + (rules[state.substring(i,i+2)] ?? "");

        }
        state = next + state[state.length-1];
    }
    let cnts: Record<string, number> = {};
    for (const char of state){
        cnts[char] = (cnts[char] ?? 0) + 1;
    }
    let min = Infinity;
    let max = 0;
    for (const cnt of Object.values(cnts)){
        if (cnt < min){min = cnt;}
        if (cnt > max){max = cnt;}
    }
    return max - min;
}

function part2( {input_str}: Context){
    const {elements, rules} = parse(input_str);
    let pairs: Record<string, number> = {};
    for (let i = 0; i < elements.length -1; i++){
        const pair = elements.substring(i,i+2);
        pairs[pair] = (pairs[pair] ?? 0) + 1;
    }
    let cnts: Record<string, number> = {};
    for (const char of elements){
        cnts[char] = (cnts[char] ?? 0) + 1;
    }
    for (let i = 0; i < 40; i++){
        let next: Record<string, number> = {};
        for (const [pair, cnt] of Object.entries(pairs)){
            const insert = rules[pair];
            if (insert){
                cnts[insert] = (cnts[insert] ?? 0) + cnt;
                const left = pair[0] + insert, right = insert + pair[1];
                next[left] = (next[left]??0) + cnt;
                next[right] = (next[right]??0) + cnt;
            } else {
                next[pair] = (next[pair]??0)+cnt;
            }
        }
        pairs = next;
    }
    let min = Infinity;
    let max = 0;
    for (const cnt of Object.values(cnts)){
        if (cnt < min){min = cnt;}
        if (cnt > max){max = cnt;}
    }
    return max - min;
}
