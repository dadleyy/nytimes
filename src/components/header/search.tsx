import * as React from "react";
import Search from "news/components/hoc/search";

export class Delegate {

  async search(query : string) : Promise<boolean> {
    return false;
  }

}

const Item : React.SFC = function(props : any) : JSX.Element {
  return <div></div>;
};

export default Search(Item);
