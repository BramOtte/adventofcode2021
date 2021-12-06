import { l } from "./util.js";

export{}

const day_count = 6;


load();
async function load(){
    const root = l();
    document.body.appendChild(root);
    // const day = day_count;
    // await load_day(day, root);
    await Promise.allSettled(Array.from({length:day_count}, (v,i)=>load_day(i+1, root.appendChild(l()))));
    if (location.href.includes("#")){
        location.href = location.href;
    }
}
async function load_text(url: string){
    const res = await fetch(url);
    if (!res.ok){
        throw new Error(`error ${res.status}: ${res.statusText}, ${url}`);
    }
    const text = await res.text();
    return text.replace(/\r/g, "");
}

async function load_day(day: number, root: HTMLElement){
    const folder = `day/${day}`;
    const src = await load_text(`./${folder}/sol.ts`);
    const mod = (await import(`./${folder}/sol.js`)) as {solve: Solve};
    const day_el = l("div", {},
        l("h1", {id:`day${day}`}, `day ${day}`), 
        l("details", {}, l("summary", {}, "source code"), l("pre",{},src)),
        l("a", {href:`https://github.com/BramOtte/adventofcode2021/blob/main/day/${day}/sol.ts`}, "github"), l("br"),
        l("a", {href:`https://adventofcode.com/2021/day/${day}`}, "Puzzle Description"),
    );
    root.appendChild(day_el);
    const inputs: Record<string, string> = {};
    await Promise.allSettled(mod.solve.map((s, i) => {
        const part_el = l("div", {}, l("h2", {}, `${s[0].name}`));
        day_el.appendChild(part_el);
        return load_part(s, folder, inputs, part_el);
    }))
}

async function load_part(solve: [To_Solve, ...string[]], folder: string, inputs: Record<string, string>, html: HTMLElement){
    const [f, ...urls] = solve;
    for (const url of urls){
        let input_str = inputs[url];
        if (input_str === undefined){
            input_str = await load_text(`./${folder}/${url}.txt`);
            inputs[url] = input_str;
        }
        const element = l();
        html.append(
            l("h3", {}, url),
            l("details",{}, l("summary",{}, "input"), l("pre",{}, input_str)),
            element
        )
        const context: Context = {
            html: element,
            input_str,
        };
        const output = await f(context);
        const o = document.createElement("code");
        o.innerText = ""+output;
        html.appendChild(o);

    }
}
