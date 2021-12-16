type L<T extends string | HTMLElement> =  T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T]: (T extends HTMLElement ? T : HTMLElement)

/*
a new HTML-element is made with the tag
if there is an object apply its attributes to the element
append each given child to the element
*/
export function l<T extends string | HTMLElement>(tagOrElement: T|string = "DIV", attributes: Partial<L<T>> & {tagName?: never} = {}, ...children: (Node|string)[]): L<T>
{
    let element: HTMLElement;
    if (typeof tagOrElement === 'object')element = tagOrElement;
    else element =  document.createElement(tagOrElement);
    if (attributes)
        attribute(element, attributes)
    if (children)
        element.append(...children)
    return element as any;
}
l.document = window?.document;
l.setDocument = document=>{l.document = document;}


// applies all attributes in an object to a HTML-element
export function attribute(element: Element, attributes={}){
    for (let name in attributes) element.setAttribute(name, attributes[name]);
    Object.assign(element, attributes);
}


export function ctx2d_new(width: number, height: number){
    const canvas = l("canvas", {width, height});
    const ctx = canvas.getContext("2d");
    if (ctx === null){
        throw new Error("Unable to create 2d context");
    }
    return ctx;
}

export function details(summary: string, ...body: (string|Node)[]){
    return l("details", {}, l("summary", {}, summary), ...body)
}

interface Draw_Context {
    btn_text?: string,
    summary?: string,
    width: number,
    height: number,
    update?: (ctx: CanvasRenderingContext2D, t: number) => void | boolean,
    on_open?: ()=> void,
    on_close?: ()=> void,
    on_btn?: (ctx: CanvasRenderingContext2D, t: number) => void
}

export function lazy_canvas(ctx: Draw_Context): HTMLElement {
    const button = l("button", {onclick}, ctx.btn_text??"Draw Image");

    function onclick(){
        const ctx2d = ctx2d_new(ctx.width, ctx.height);
        const d = l(details(ctx.summary??"Image", ctx2d.canvas), {open: true});
        button.replaceWith(d);
        let animation_frame;
        d.onclick = () => {
            if (d.open){
                close();
            } else {
                open();
            }
        }
        ctx.on_btn?.(ctx2d, performance.now());
        open();
        function open(){
            ctx.on_open?.()
            draw(performance.now());
        }
        function close(){
            cancelAnimationFrame(animation_frame);
            ctx.on_close?.()
        }
        function draw(t: number){
            if (ctx.update?.(ctx2d, t)){
                animation_frame = requestAnimationFrame(draw);
            }
        }
    }

    return button;
}

export function sum(numbers: number[]){
    return numbers.reduce((a,b) => a + b, 0);
}
export function sumb(numbers: bigint[]){
    return numbers.reduce((a,b) => a + b, 0n);
}

export function prod(numbers: number[]){
    return numbers.reduce((a,b) => a * b, 1);
}
export function prodb(numbers: bigint[]){
    return numbers.reduce((a,b) => a * b, 1n);
}
export function minb(numbers: bigint[]){
    return numbers.reduce((a,b)=>a<b?a:b, numbers[0])
}
export function maxb(numbers: bigint[]){
    return numbers.reduce((a,b)=>a>b?a:b, numbers[0])
}