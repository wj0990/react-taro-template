import React from "react"
import H5 from './H5';
import Weapp from "./Weapp";

export interface TaroCanvasProps {
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

export function TaroCanvas(props: TaroCanvasProps) {
  const { height = 200 } = props;
  if (process.env.TARO_ENV === 'weapp') {
    return <Weapp {...props} height={height} />;
  }
  return <H5 {...props} height={height} />
}