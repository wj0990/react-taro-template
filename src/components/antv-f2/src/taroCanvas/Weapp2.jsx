import React, { useState, useEffect, Fragment } from "react"
import Taro, { createSelectorQuery,createCanvasContext, getSystemInfoSync } from '@tarojs/taro';
import { Canvas, View, CanvasTouchEvent, ITouchEvent } from '@tarojs/components';

import * as f2 from '@antv/f2';

function generateRandomString() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function wrapEvent(e) {
  if (!e) return;
  if (!e.preventDefault) {
    e.preventDefault = function () {};
  }
  return e;
}


export default function Weapp(props) {
  
  const { width, height, children } = props;
  const [id, setId] = useState('');
  const [canvas, setCanvas] = useState(undefined);
  const [query, setQuery] = useState(undefined);

  useEffect(() => {
    // 在组件 mount 后执行选择器
    const query = Taro.createSelectorQuery();
    setQuery(query); // 保存选择器对象为实例属性
    if (!id) {
      setId('f2-canvas-' + generateRandomString());
    } else {
      init();
    }
  }, [id])

  useEffect(() => {
    canvas && children && render();
  }, [canvas, children])

  const init = () => {
    if (!query) return;
    setTimeout(() => { // 延迟执行，等待 DOM 渲染完成
      query.select('#' + id).fields({
        node: true,
        size: true
      }).exec((res) => {
        console.log('---resres------->',res)
        const { width, height, node } = res[0];
        const pixelRatio = Taro.getSystemInfoSync().pixelRatio;
        node.width = 300 * pixelRatio;
        node.height = 200 * pixelRatio;
        // const context = createCanvasContext(id, this.$scope);
        const context = Taro.createCanvasContext(id);
        const _canvas = new f2.Canvas({
          context,
          width:300,
          height:200,
          pixelRatio
        });
        _canvas.render();
        setCanvas(_canvas);
      })
    }, 10)
  }

  const render = () => {
    canvas && canvas.update({
      children
    })
  }

  const touchStart = (e) => {
    canvas && canvas.emitEvent('touchstart', [wrapEvent(e)]);
  }

  const touchMove = (e) => {
    canvas && canvas.emitEvent('touchmove', [wrapEvent(e)]);
  }

  const touchEnd = (e) => {
    canvas && canvas.emitEvent('touchend', [wrapEvent(e)]);
  }

  const click = (e) => {
    canvas && canvas.emitEvent('click', [wrapEvent(e)]);
  }

  const wrapEvent = (event) => {
    if (!event.preventDefault) {
      event.preventDefault = () => {};
    }
    return event;
  }

  if (!id || !children) {
    return null;
  }

  return (
    <View style={{ width, height }}>
      <Canvas
        id={id}
        canvas-id={id}
        type="2d"
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
        onClick={click}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  )
}