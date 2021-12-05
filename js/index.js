import { l } from "./l.js";
const day_count = 5;
load();
async function load() {
    const root = document.createElement("div");
    document.body.appendChild(root);
    // const day = 5;
    for (let day = 1; day <= day_count; day++) {
        load_day(day, root);
    }
}
async function load_text(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`error ${res.status}: ${res.statusText}, ${url}`);
    }
    const text = await res.text();
    return text.replace(/\r/g, "");
}
async function load_day(day, root) {
    const folder = `day/${day}`;
    const src = await load_text(`./${folder}/sol.ts`);
    const mod = (await import(`./${folder}/sol.js`));
    const day_el = l("div", {}, l("h1", { id: `day${day}` }, `day${day}`), l("details", {}, l("summary", {}, "source code"), l("pre", {}, src)), l("a", { href: `https://github.com/BramOtte/adventofcode2021/blob/main/day/${day}/sol.ts` }, "github"), l("br"), l("a", { href: `https://adventofcode.com/2021/day/${day}` }, "Puzzle Description"));
    root.appendChild(day_el);
    const inputs = {};
    for (let i = 0; i < mod.solve.length; i++) {
        const s = mod.solve[i];
        const part_el = l("div", {}, l("h2", {}, `part ${i + 1}`));
        day_el.appendChild(part_el);
        load_part(s, folder, inputs, part_el);
    }
}
async function load_part(solve, folder, inputs, html) {
    const [f, ...urls] = solve;
    for (const url of urls) {
        let input_str = inputs[url];
        if (input_str === undefined) {
            input_str = await load_text(`./${folder}/${url}.txt`);
            inputs[url] = input_str;
        }
        const element = l();
        html.append(l("h3", {}, url), l("details", {}, l("summary", {}, "input"), l("pre", {}, input_str)), element);
        const context = {
            html: element,
            input_str,
        };
        const output = await f(context);
        const o = document.createElement("code");
        o.innerText = "" + output;
        html.appendChild(o);
    }
}
//# sourceMappingURL=index.js.map