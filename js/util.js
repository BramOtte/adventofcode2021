/*
a new HTML-element is made with the tag
if there is an object apply its attributes to the element
append each given child to the element
*/
export function l(tagOrElement = "DIV", attributes = {}, ...children) {
    let element;
    if (typeof tagOrElement === 'object')
        element = tagOrElement;
    else
        element = document.createElement(tagOrElement);
    if (attributes)
        attribute(element, attributes);
    if (children)
        element.append(...children);
    return element;
}
l.document = window?.document;
l.setDocument = document => { l.document = document; };
// applies all attributes in an object to a HTML-element
export function attribute(element, attributes = {}) {
    for (let name in attributes)
        element.setAttribute(name, attributes[name]);
    Object.assign(element, attributes);
}
export function ctx2d_new(width, height) {
    const canvas = l("canvas", { width, height });
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
        throw new Error("Unable to create 2d context");
    }
    return ctx;
}
export function details(summary, ...body) {
    return l("details", {}, l("summary", {}, summary), ...body);
}
export function lazy_canvas(ctx) {
    const button = l("button", { onclick }, ctx.btn_text ?? "Draw Image");
    function onclick() {
        const ctx2d = ctx2d_new(ctx.width, ctx.height);
        const d = l(details(ctx.summary ?? "Image", ctx2d.canvas), { open: true });
        button.replaceWith(d);
        let animation_frame;
        d.onclick = () => {
            if (d.open) {
                close();
            }
            else {
                open();
            }
        };
        ctx.on_btn?.(ctx2d, performance.now());
        open();
        function open() {
            ctx.on_open?.();
            draw(performance.now());
        }
        function close() {
            cancelAnimationFrame(animation_frame);
            ctx.on_close?.();
        }
        function draw(t) {
            if (ctx.update?.(ctx2d, t)) {
                animation_frame = requestAnimationFrame(draw);
            }
        }
    }
    return button;
}
export function sum(numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}
export function sumb(numbers) {
    return numbers.reduce((a, b) => a + b, 0n);
}
//# sourceMappingURL=util.js.map