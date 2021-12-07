import {Redirect, RouteComponentProps} from "react-router-dom";
import React from "react";

export function RedirectToBond(props: RouteComponentProps<{ bondName: string }>) {
  const {
    match: {
      params: { bondName }
    }
  } = props
  return <Redirect to={`/mint/${bondName}`} />


}