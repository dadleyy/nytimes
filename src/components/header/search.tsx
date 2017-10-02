import * as React from "react";
import Input from "news/components/form/input";
import t from "news/services/i18n";
import { withRouter } from "react-router-dom";

class Search extends React.Component<any, any> {

  go(event : React.KeyboardEvent<HTMLInputElement>) : void {
    const { props } = this;
    const { currentTarget } = event;
    const query = currentTarget.value;
    props.history.push(`/search?q=${query}`);
  }

  render() : JSX.Element {
    const { state } = this;

    return <Input placeholder={t("search")} onEnter={(event) => this.go(event)} />;
  }

}

export default withRouter(Search);
