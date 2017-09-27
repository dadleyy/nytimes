import * as React from "react";
import Input, { InputProps } from "news/components/form/input";

export interface SearchDelegate {
  search : (query : string) => Promise<boolean>;
}

export interface SearchProps extends InputProps {
  delegate : SearchDelegate;
}

const Factory = function<P>(Result : React.ComponentType<P>) : React.StatelessComponent<SearchProps> {
  const Search : React.SFC<InputProps> = function(props : SearchProps) : JSX.Element {
    const { delegate } = props;

    async function search(event : React.KeyboardEvent<HTMLInputElement>) : Promise<boolean> {
      const { value } = event.currentTarget;
      const results = await delegate.search(value);

      return results;
    }

    return <Input placeholder={props.placeholder} onInput={search} />;
  };

  return Search;
};

export default Factory;
