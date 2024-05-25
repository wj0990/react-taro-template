import React,{useState, useEffect} from "react";
import Taro from "@tarojs/taro";
import { View } from '@tarojs/components';
import { IconFont } from '@nutui/icons-react-taro'

const Index = (props) => {
  const { labels =[],options, onDelete ,...resetProps} = props;
  const [isOpen, setIsOpen] = useState(false);

  const [animationData, setAnimationData] = useState({});


  useEffect(()=>{
    setIsOpen(props.isOpen)
  },[props.isOpen])


  const toggleIcon = (bool) => {
    const animation = Taro.createAnimation({
      duration: 300, // 过渡时间
      timingFunction: 'ease' // 过渡效果
    });


    if (bool) {
      // 关闭
      animation.rotate(0).step();
    } else {
      // 打开
      animation.rotate(-90).step();
    }

    setAnimationData(animation.export());
    setIsOpen(!isOpen);
  };


  // const handleClose = (event, i)=>{
  //   onDelete && onDelete(event, i)
  //   event?.preventDefault();
  //   event.stopPropagation(); // 阻止事件冒泡
  // }

  console.log('-------isOpenisOpenisOpenisOpenisOpenisOpen--111-->',isOpen)

  return (
    <View  
      animation={animationData}
    >
      <IconFont 
        name="triangle-down"
        // name={iconItem ? iconItem : 'triangle-down'}
        size="12" 
        animation={animationData}
        {...resetProps}
        onClick={()=>toggleIcon(isOpen)} 
      // className={[
      //   typeof icon === 'function' ? `${prefixCls}-switcher-noop` : null,
      //   noChild ? 'no-child' : null,
      //   !iconAnimation ? 'no-animation' : null,
      //   itemIsOpen ? 'open' : null,
      // ].filter(Boolean).join(' ').trim()}
      />
    </View>
   

  )
}
export default Index;