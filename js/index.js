const day_count = 5;
load();
async function load() {
    const root = document.createElement("div");
    document.body.appendChild(root);
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
    const day_el = document.createElement("div");
    root.appendChild(day_el);
    const folder = `day/${day}`;
    const src = await load_text(`./${folder}/sol.ts`);
    const mod = (await import(`./${folder}/sol.js`));
    day_el.innerHTML = `<h1 id="day${day}">day${day}</h1><details><summary>source code</summary><pre>${src}</pre></details>`
        + `<a href="https://github.com/BramOtte/adventofcode2021/blob/main/day/${day}/sol.ts">Github</a>`
        + `<br><a href="https://adventofcode.com/2021/day/${day}">Puzzle Description</a>`;
    const inputs = {};
    for (let i = 0; i < mod.solve.length; i++) {
        const s = mod.solve[i];
        const part_el = document.createElement("div");
        part_el.innerHTML = `<h2>part ${i + 1}:</h2>`;
        day_el.appendChild(part_el);
        load_part(s, folder, inputs, part_el);
    }
}
async function load_part(solve, folder, inputs, html) {
    const [f, ...urls] = solve;
    for (const url of urls) {
        html.innerHTML += `<h3>${url}:<h3>`;
        let input_str = inputs[url];
        if (input_str === undefined) {
            input_str = await load_text(`./${folder}/${url}.txt`);
            inputs[url] = input_str;
        }
        html.innerHTML += `<details><summary>input</summary><pre>${input_str}</pre></details>`;
        const context = {
            html: html.appendChild(document.createElement("div")),
            input_str,
        };
        const output = await f(context);
        const o = document.createElement("code");
        o.innerText = "" + output;
        html.appendChild(o);
    }
}
export {};
//# sourceMappingURL=index.js.map