import * as React from "react";
import * as ReactDOM from "react-dom";
import Input, { InputProps } from "news/components/form/input";
import { Popup } from "news/services/popups";

export interface SearchDelegate {
  search : (query : string) => Promise<boolean>;
}

export interface SearchProps extends InputProps {
  delegate : SearchDelegate;
}

const Factory = function<P>(Result : React.ComponentType<P>) : React.ComponentClass<SearchProps> {
  class Search extends React.Component<SearchProps> {

    render() : JSX.Element {
      const { props } = this;
      const { delegate } = props;

      const search = async(event : React.KeyboardEvent<HTMLInputElement>) : Promise<JSX.Element> => {
        const { value } = event.currentTarget;
        const { refs } = this;
        const results = await delegate.search(value);
        const popup = refs["popup"];

        // ReactDOM.render(<div />, popup);
        return null;
      };

      return (
        <main>
          <Popup ref="popup" />
          <Input placeholder={props.placeholder} onInput={search} />
        </main>
      );
    }

  }

  return Search;
};

export default Factory;
