import * as React from "react";
import {Counter} from "../containers/Counter";


export const Footer = () => (
  <div>
    <Counter />
    <img src={require("../images/sky.png") } height="200"/>
  </div>
);
