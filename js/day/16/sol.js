import { maxb, minb, prodb, sumb } from "../../util.js";
export const solve = [[part1, "example", "input"], [part2, "example2", "input"]];
function parse(text) {
    return text.split("\n").map(line => {
        const ints = Math.ceil(line.length / 8);
        const data = new Int32Array(ints);
        line += "0".repeat(ints * 8 - line.length);
        for (let i = 0; i < data.length; i++) {
            data[i] = parseInt(line.substring(i * 8, i * 8 + 8), 16);
        }
        return data;
    });
}
const bits = 32;
const max = 2 ** bits - 1;
class Reader {
    bc;
    data;
    get done() {
        return this.bc / bits >= this.data.length;
    }
    restart(data) {
        this.data = data;
        this.bc = 0;
    }
    bit() {
        if (this.done) {
            throw new Error(`${this.bc}`);
        }
        const i = Math.floor(this.bc / bits), j = this.bc % bits;
        this.bc++;
        return (this.data[i] >>> (31 - j)) & 1;
    }
    uint(length) {
        let int = 0;
        for (let i = 0; i < length; i++) {
            int = (int << 1) | this.bit();
        }
        return int;
        // if (this.done){
        //     throw new Error(`${this.bc}`);
        // }
        // const i = Math.floor(this.bc / bits), j = this.bc % bits;
        // let int = (this.data[i] << j) >>> (bits - length);
        // if (length > bits - j){
        //     const shift = (bits - length) + (bits - j);
        //     console.log("aaa", shift, int);
        //     int |= (this.data[i+1] << shift) >>> shift;
        //     console.log("bbb", int);
        // }
        // this.bc += length
        // return int;
    }
}
function part1({ input_str }) {
    const reader = new Reader();
    return parse(input_str).map(input => {
        reader.restart(input);
        return p();
    });
    function p() {
        const version = reader.uint(3);
        let sum = version;
        const type = reader.uint(3);
        if (type === 4 /* lit */) {
            let con = 1;
            let val = 0;
            while (con) {
                con = reader.uint(1);
                const value = reader.uint(4);
                val = (val << 4) | value;
            }
        }
        else { // operator
            const length_type = reader.uint(1);
            if (length_type == 0 /* bits */) {
                const bits = reader.uint(15);
                const end = reader.bc + bits;
                while (reader.bc < end && !reader.done) {
                    sum += p();
                }
            }
            else { // packet
                const packs = reader.uint(11);
                for (let i = 0; i < packs && !reader.done; i++) {
                    sum += p();
                }
            }
        }
        return sum;
    }
}
function part2({ input_str }) {
    const reader = new Reader();
    return parse(input_str).map(input => {
        reader.restart(input);
        return p();
    });
    function p() {
        const version = reader.uint(3);
        const type = reader.uint(3);
        if (type === 4 /* lit */) {
            let con = 1;
            let val = 0n;
            while (con) {
                con = reader.uint(1);
                const value = reader.uint(4);
                val = (val << 4n) | BigInt(value);
            }
            return val;
        }
        else { // operator
            const length_type = reader.uint(1);
            const args = [];
            if (length_type == 0 /* bits */) {
                const bits = reader.uint(15);
                const end = reader.bc + bits;
                while (reader.bc < end && !reader.done) {
                    args.push(p());
                }
            }
            else { // packet
                const packs = reader.uint(11);
                for (let i = 0; i < packs && !reader.done; i++) {
                    args.push(p());
                }
            }
            switch (type) {
                case 0 /* sum */: return sumb(args);
                case 1 /* prod */: return prodb(args);
                case 2 /* min */: return minb(args);
                case 3 /* max */: return maxb(args);
                case 5 /* gt */: return args[0] > args[1] ? 1n : 0n;
                case 6 /* lt */: return args[0] < args[1] ? 1n : 0n;
                case 7 /* eq */: return args[0] == args[1] ? 1n : 0n;
            }
        }
    }
}
//# sourceMappingURL=sol.js.map