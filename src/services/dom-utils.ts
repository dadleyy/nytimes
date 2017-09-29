export interface QuickAttributes {
  classes : Array<string>;
}

export function create(node_name : string, attributes? : QuickAttributes) : HTMLElement {
  const e = document.createElement(node_name);

  if(!attributes) {
    return e;
  }

  if(attributes.classes) {
    e.classList.add(...attributes.classes);
  }

  return e;
}
