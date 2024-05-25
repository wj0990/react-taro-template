    import React from 'react';
    import { View } from '@tarojs/components';
    import { Empty } from '@nutui/nutui-react-taro';
    import  clockIcon1 from '@/assets/svg/empty.svg';
    import './index.scss';

    const  EmptyCust = (props)=>{
      const {description="暂无数据",  className, ...resetProps} =props
      const cls = ['empty-wrap',className].filter(Boolean).join(' ').trim();
      
      return (
        <View  className={cls}>
          <Empty
            description={description}
            image={
              <img
                src={clockIcon1}
                alt=""
              />
            }
            {...resetProps}
          />
        </View>
      )
    }

    export default EmptyCust;