import React, { useState, useEffect, Fragment } from "react"
import { createSelectorQuery, getSystemInfoSync } from '@tarojs/taro';
import { Canvas, View, CanvasTouchEvent, ITouchEvent } from '@tarojs/components';
import * as f2 from '@antv/f2';
import type { TaroCanvasProps } from './index';

function generateRandomString() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function wrapEvent(e: CanvasTouchEvent | ITouchEvent) {
  if (!e) return;
  if (!e.preventDefault) {
    e.preventDefault = function () {};
  }
  return e;
}

export default function Weapp(props: TaroCanvasProps) {
  const { width = '100%', height, children } = props;
  const [id, setId] = useState<string>('');
  const [canvas, setCanvas] = useState<f2.Canvas | undefined>(undefined);
  const [canvasEl, setCanvasEl] = useState<any>(undefined);

  useEffect(() => {
    if (!id) {
      const str = 'f2-canvas-' + generateRandomString();
      setId(str);
    } else {
      init();
    }
  }, [id])

  useEffect(() => {
    canvas && children && render();
  }, [canvas, children])

  const init = () => {
    if (!children) return;
    setTimeout(() => {
      const query = createSelectorQuery();
      query.select('#' + id).fields({
        node: true,
        size: true
      }).exec((res: any) => {
        if (!res) return;
        const data = res[0];
        const { node } = data;
        if (!node) return;
        const pixelRatio = getSystemInfoSync().pixelRatio;
        node.width = data.width * pixelRatio;
        node.height = data.height * pixelRatio;
        const context = node.getContext('2d');
        const _canvas: f2.Canvas = new f2.Canvas({
          pixelRatio,
          width: data.width,
          height: data.height,
          context,
        })
        _canvas.render();
        setCanvas(_canvas);
        const _canvasEl = _canvas.canvas.get('el');
        setCanvasEl(_canvasEl);
      })
    }, 100)
  }

  const render = () => {
    canvas && canvas.update({
      children
    })
  }

  const touchStart = (e: CanvasTouchEvent) => {
    if (!canvasEl || !canvas) return;
    canvasEl.dispatchEvent('touchstart', wrapEvent(e));
  }

  const touchMove = (e: CanvasTouchEvent) => {
    if (!canvasEl || !canvas) return;
    canvasEl.dispatchEvent('touchmove', wrapEvent(e));
  }

  const touchEnd = (e: CanvasTouchEvent) => {
    if (!canvasEl || !canvas) return;
    canvasEl.dispatchEvent('touchend', wrapEvent(e));
  }

  const click = (e: ITouchEvent) => {
    if (!canvasEl || !canvas) return;
    const event = wrapEvent(e) as CanvasTouchEvent;
    // 包装成 touch 对象
    event.touches = [e.detail];
    canvasEl.dispatchEvent('click', event);
  }

  if (!id || !children) {
    return <Fragment />
  }

  return (
    <View style={{ width, height }}>
      <Canvas
        type="2d"
        id={id}
        canvas-id={id}
        width="100%"
        height="100%"
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
        onClick={click}
        style={{ width: '100%', height: '100%' }}
      />
    </View>
  )
}