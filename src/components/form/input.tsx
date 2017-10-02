import * as React from "react";

export interface InputProps {
  placeholder? : string;
  className? : string;
  onInput? : React.EventHandler<React.KeyboardEvent<HTMLInputElement>>;
  onEnter? : React.EventHandler<React.KeyboardEvent<HTMLInputElement>>;
}

const Input : React.SFC<InputProps> = function(props : InputProps) : JSX.Element {
  const keyUp = (event : React.KeyboardEvent<HTMLInputElement>) : void => {
    if(props.onEnter && event.keyCode === 13) {
      props.onEnter(event);
    }
  };

  const classes = ["input"];

  if(props.className) {
    classes.push(props.className);
  }

  return (
    <input
      className={classes.join(" ")}
      placeholder={props.placeholder}
      onInput={props.onInput}
      onKeyUp={keyUp}
    />
  );
};

export default Input;
