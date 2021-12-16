import { maxb, minb, prod, prodb, sumb } from "../../util.js";

export const solve: Solve = [[part1,"example", "input"], [part2,"example2", "input"]];

function parse(text:string){
    return text.split("\n").map(line => {
        const ints = Math.ceil(line.length/8);
        const data = new Int32Array(ints);
        line += "0".repeat(ints*8 - line.length);
        for (let i = 0; i < data.length; i++){
            data[i] = parseInt(line.substring(i*8, i*8+8), 16);
        }
        return data;
    });
}
const bits = 32;
const max = 2 ** bits - 1;

class Reader {
    bc!: number;
    data!: Int32Array;
    get done(){
        return this.bc / bits >= this.data.length
    }
    restart(data: Int32Array){
        this.data = data;
        this.bc = 0;
    }
    bit(){
        if (this.done){
            throw new Error(`${this.bc}`);
        }
        const i = Math.floor(this.bc / bits), j = this.bc % bits;
        this.bc++;
        return (this.data[i] >>> (31-j)) & 1;
    }

    uint(length: number){
        if (this.done){
            throw new Error(`${this.bc}`);
        }
        const i = Math.floor(this.bc / bits), j = this.bc % bits;
        let int = (this.data[i] << j) >>> (bits - length);
        if (length > bits - j){
            int |= this.data[i+1] >>> (bits - length + bits - j)
        }
        this.bc += length
        return int;
    }
}
// const c = 9;
// let m = (1 << c)-1, a = m, b = m;
// let l = 7, j = 4;
// console.log([
//     a = (a << j) & m,
//     a = (a >>> (c-l)) & m,
//     l >= (c-j),
//     b = (b >>> (c - l + c - j)) & m
// ].map(v => v.toString(2)));


const enum T {
    lit = 4,
    sum = 0,
    prod = 1,
    min = 2,
    max = 3,
    gt = 5,
    lt = 6,
    eq = 7
}
const enum LT {
    bits = 0,
    pack = 1,
}

function part1({input_str}: Context) {
    const reader = new Reader();
    return parse(input_str).map(input => {
        reader.restart(input);
        return p();
    });

    function p(){
        const version = reader.uint(3);
        let sum = version;
        const type = reader.uint(3);
        if (type === T.lit){
            let con = 1;
            let val = 0;
            while (con){
                con = reader.uint(1);
                const value = reader.uint(4);
                val = (val << 4) | value
            }
        } else { // operator
            const length_type = reader.uint(1);
            if (length_type == LT.bits){
                const bits = reader.uint(15);
                const end = reader.bc + bits;
                while (reader.bc < end && !reader.done) {
                    sum += p();
                }
            } else { // packet
                const packs = reader.uint(11);
                for (let i = 0; i < packs && !reader.done; i++){
                    sum += p();
                }
            }
        }
        return sum;
    }
}

function part2( {input_str}: Context){
    const reader = new Reader();
    return parse(input_str).map(input => {
        reader.restart(input);
        return p();
    });

    function p(): bigint{
        const version = reader.uint(3);
        const type = reader.uint(3);
        if (type === T.lit){
            let con = 1;
            let val = 0n;
            while (con){
                con = reader.uint(1);
                const value = reader.uint(4);
                val = (val << 4n) | BigInt(value)
            }
            return val;
        } else { // operator
            const length_type = reader.uint(1);
            const args: bigint[] =[]
            if (length_type == LT.bits){
                const bits = reader.uint(15);
                const end = reader.bc + bits;
                while (reader.bc < end && !reader.done) {
                    args.push(p());
                }
            } else { // packet
                const packs = reader.uint(11);
                for (let i = 0; i < packs && !reader.done; i++){
                    args.push(p());
                }
            }
            switch (type){
            case T.sum: return sumb(args);
            case T.prod: return prodb(args);
            case T.min: return minb(args)
            case T.max: return maxb(args);
            case T.gt: return args[0] > args[1] ? 1n : 0n;
            case T.lt: return args[0] < args[1] ? 1n : 0n;
            case T.eq: return args[0] == args[1] ? 1n : 0n;
            }
        }
    }
}
