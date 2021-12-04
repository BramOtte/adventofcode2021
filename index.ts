export{}

const day_count = 4;


load();
async function load(){
    const root = document.createElement("div");
    document.body.appendChild(root);
    for (let day = 1; day <= day_count; day++){
        load_day(day, root);
    }
}
async function load_text(url: string){
    const res = await fetch(url);
    const text = await res.text();
    if (!res.ok){
        throw new Error(`error ${res.status}: ${res.statusText}, ${url}`);
    }
    return text;
}

async function load_day(day: number, root: HTMLElement){
    const day_el = document.createElement("div");
    root.appendChild(day_el);
    const folder = `day/${day}`;
    const src = await load_text(`./${folder}/sol.ts`);
    const mod = (await import(`./${folder}/sol.js`)) as {solve: Solve};
    day_el.innerHTML = `<h1 id="day${day}">day${day}</h1><details><summary>source code</summary><pre>${src}</pre></details>`
        + `<a href="https://github.com/BramOtte/adventofcode2021/blob/main/day/${day}/sol.ts">Github</a>`
        + `<br><a href="https://adventofcode.com/2021/day/${day}">Puzzle Description</a>`;
    const inputs: Record<string, string> = {};
    for (let i = 0; i < mod.solve.length; i++){
        const s = mod.solve[i];
        const part_el = document.createElement("div");
        part_el.innerHTML = `<h2>part ${i+1}:</h2>`
        day_el.appendChild(part_el);
        load_part(s, folder, inputs, part_el);
    }
}

async function load_part(solve: [To_Solve, ...string[]], folder: string, inputs: Record<string, string>, html: HTMLElement){
    const [f, ...urls] = solve;
    for (const url of urls){
        html.innerHTML += `<h3>${url}:<h3>`;
        let input_str = inputs[url];
        if (input_str === undefined){
            input_str = await load_text(`./${folder}/${url}.txt`);
            html.innerHTML += `<details><summary>input</summary><pre>${input_str}</pre></details>`;
            inputs[url] = input_str;
 }
        const context: Context = {
            html: html.appendChild(document.createElement("div")),
            input_str,
        };
        const output = await f(context);
        const o = document.createElement("code");
        o.innerText = ""+output;
        html.appendChild(o);

    }
}
