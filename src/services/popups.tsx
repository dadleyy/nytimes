import * as React from "react";
import * as ReactDOM from "react-dom";

class InternalState {
  mount_point : HTMLElement;
}

const state = new InternalState();

export class Popup extends React.Component<any> {

  render() : JSX.Element {
    const { props } = this;
    if(!state.mount_point) {
      throw new Error("invalid-mount-point");
    }

    // Portal (waiting for https://github.com/DefinitelyTyped/DefinitelyTyped/pull/20065)
    return (ReactDOM as any).createPortal(props.children, state.mount_point);
  }

}

export default {

  mount(mount_point : HTMLElement) : void {
    state.mount_point = mount_point;
  },

  unmount() : void {
  }

};
