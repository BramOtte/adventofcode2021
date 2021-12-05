export {l, attribute};
type L<T extends string | HTMLElement> =  T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T]: (T extends HTMLElement ? T : HTMLElement)

/*
a new HTML-element is made with the tag
if there is an object apply its attributes to the element
append each given child to the element
*/
function l<T extends string | HTMLElement>(tagOrElement: T|string = "DIV", attributes: Partial<L<T>> & {tagName?: never} = {}, ...children: (Node|string)[]): L<T>
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
function attribute(element: Element, attributes={}){
    for (let name in attributes) element.setAttribute(name, attributes[name]);
    Object.assign(element, attributes);
}
