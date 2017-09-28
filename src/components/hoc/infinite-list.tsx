import * as React from "react";
import * as ReactDOM from "react-dom";
import Viewport, { ViewportListenerId, ScrollPositions } from "news/services/viewport";
import { create as createElement } from "news/services/dom-utils";

export interface DataResults {
  items : Array<any>;
  meta : any;
}

export interface LoadParams {
  page? : number;
}

export interface ListDelegate {
  load : (params? : LoadParams) => Promise<DataResults>;
}

export interface ListItemProps<T> {
  delegate : ListDelegate;
  item : T;
}

export interface ListProps {
  delegate : ListDelegate;
}

export interface RenderedChild {
  component : JSX.Element;
  container : HTMLElement;
}

export type ListItemTransclusion<T> = React.ComponentType<ListItemProps<T>>;

function Factory<T>(ItemType : ListItemTransclusion<T>) : React.ComponentClass<ListProps> {
  class List extends React.Component<ListProps> {
    private scroll_listener : ViewportListenerId | null = null;
    private rendered_items : Array<RenderedChild> = [];
    private loading : boolean = false;

    async componentDidMount() : Promise<void> {
      const { props } = this;
      this.scroll_listener = Viewport.on<ScrollPositions>("scroll", this.monitor, this);
      await this.transclude(props.delegate);
    }

    async componentWillReceiveProps(new_props : ListProps) : Promise<void> {
      await this.transclude(new_props.delegate);
    }

    componentWillUnmount() : void {
      Viewport.off(this.scroll_listener);
      this.scroll_listener = null;
      this.unmountItems();
    }

    unmountItems() : void {
      const { refs, rendered_items } = this;
      const list_container = refs["list"] as HTMLElement;

      for(let i = 0, c = rendered_items.length; i < c; i++) {
        const item = rendered_items[i];
        ReactDOM.unmountComponentAtNode(item.container);
        list_container.removeChild(item.container);
      }
    }

    monitor(positions : ScrollPositions) : void {
      const { refs, props } = this;
      const marker = refs["marker"] as HTMLElement;
      const [current, last] = positions;
      const bounding = marker.getBoundingClientRect();
      const diff = bounding.top - Viewport.height;

      if(current.y < last.y || diff > 0 || this.loading) {
        // We are scrolling up, do nothing.
        return;
      }

      this.loading = true;

      const finish = () => {
        this.loading = false;
      };

      this.transclude(props.delegate).then(finish);
    }

    async transclude(delegate : ListDelegate, append : boolean = false) : Promise<void> {
      const { refs, rendered_items } = this;
      let results : DataResults;

      try {
        results = await delegate.load();
      } catch (error) {
        return this.scroll_listener ? this.setState({ error }) : null;
      }

      // Make sure we're not unmounted at this point.
      if (!this.scroll_listener) {
        return;
      }

      if (rendered_items.length && append === true) {
        this.unmountItems();
      }

      const list_container = refs["list"] as HTMLElement;

      for(let i = 0, c = results.items.length; i < c; i++) {
        const item = results.items[i];
        const container = createElement("div");
        const component = <ItemType item={item} delegate={delegate} />;
        ReactDOM.render(component, container);
        list_container.appendChild(container);
        this.rendered_items.push({ container, component });
      }
    }

    render() : JSX.Element {
      const { props, state } = this;

      return (
        <main className="infinite-list">
          <section className="infinite-list__items" ref="list"></section>
          <i className="infinite-list__marker" ref="marker" />
        </main>
      );
    }
  }

  return List;
}

export default Factory;
