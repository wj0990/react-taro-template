import React from "react";
import { Canvas } from '../index';
import type { TaroCanvasProps } from './index';

export default function H5(props: TaroCanvasProps) {
  const { width, height, children  } = props;

  return (
    <div style={{ fontSize: '14PX' }}>
      <Canvas width={width} height={height} pixelRatio={window.devicePixelRatio}>
        {children as JSX.Element}
      </Canvas>
    </div>
  )
}