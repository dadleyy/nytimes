import *  as React from "react";

export interface BreadcrumbsProps {
  children : React.ReactNode[];
}

const Breadcrumbs : React.SFC<BreadcrumbsProps> = function(props : BreadcrumbsProps) : JSX.Element {
  const { children } = props;

  if (!children.length) {
    // Only one crumb, render it
    return (<nav className="flex">{children}</nav>);
  }

  function wrap(node : React.ReactNode, index : number) : JSX.Element {
    return <article className="breadcrumbs__crumb" key={index}>{node}</article>;
  }

  return (
    <nav className="flex">
      {children.map(wrap)}
    </nav>
  );
};

export default Breadcrumbs;
