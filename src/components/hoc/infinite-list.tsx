import * as React from "react";

export interface DataResults {
  items : Array<any>;
  meta : any;
}

export interface ListDelegate {
  load : () => Promise<DataResults>
}

export interface ListProps {
  delegate : ListDelegate;
}

function Factory(ItemType : React.ComponentType<ListProps>) : React.ComponentClass<ListProps> {
  class List extends React.Component<ListProps> {

    componentDidMount() {
      console.log(this);
    }

    componentWillUnmount() {
      console.log("unmounting!");
    }

    render() {
      const { props } = this;

      return (
        <main className="infinite-list">
          <section className="infinite-list__items"></section>
          <i className="infinite-list__marker" />
        </main>
      )
    }
  }

  return List;
}

export default Factory;
