export const solve: Solve = [[part1,"example", "input"], [part2,"example", "input"]];
const {min, max} = Math;

const zero = "0".charCodeAt(0);
function parse(text:string){
    const width = text.indexOf("\n");
    const values = text.split("").map(v => v.charCodeAt(0) - zero).filter(v=>v>=0&&v<=9);
    const height = values.length / width;
    return {width, height, values};
}

function step(values: number[], w: number, h: number){
    let cnt = 0;
    for (let i = 0; i < values.length; i++){  
        inc(i);
    }
    for (let i = 0; i < values.length; i++){  
        if (values[i] > 9){
            values[i] = 0;
        }
    }
    return cnt;
    function inc(i: number){
        if (++values[i] !== 10){
            return;
        }
        cnt++;;
        const x = 0| i % w;
        const y = 0| i / w;
        if (x > 0  ){inc(i-1);}
        if (x < w-1){inc(i+1);}
        if (y > 0  ){inc(i-w);}
        if (y < h-1){inc(i+w);}
        if (x > 0  && y > 0  ){inc(i-1-w);}
        if (x < w-1&& y > 0  ){inc(i+1-w);}
        if (x > 0  && y < h-1){inc(i-1+w);}
        if (x < w-1&& y < h-1){inc(i+1+w);}
    }
    
}

function part1({input_str}: Context){
    const {values, width: w, height: h} = parse(input_str);
    let cnt = 0;
    for (let it = 0; it < 100; it++){
        cnt += step(values, w, h);
    }
    return cnt;
}

function part2( {input_str}: Context){
    const {values, width: w, height: h} = parse(input_str);
    let i = 0;
    for (let cnt = 0; cnt !== values.length; i++){
        cnt = step(values, w, h);
    }
    return i;
}
