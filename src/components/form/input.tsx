import * as React from "react";

export interface InputProps {
  placeholder : string;
  className? : string;
  onInput? : React.EventHandler<React.KeyboardEvent<HTMLInputElement>>;
}

const Input : React.SFC<InputProps> = function(props : InputProps) : JSX.Element {
  return (
    <input
      className={`input ${props.className}`}
      placeholder={props.placeholder}
      onInput={props.onInput}
    />
  );
};

export default Input;
