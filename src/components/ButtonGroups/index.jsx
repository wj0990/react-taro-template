import React, { useEffect, useState, forwardRef } from 'react';
import { View, Button } from '@tarojs/components';
import './index.scss';

const ButtonGroups = forwardRef((props) => {
  const {className, options=[],onChange } = props;
  const cls = ['button-wrap',className].filter(Boolean).join(' ').trim();

  const [val, setVal] = useState(props.value)
  useEffect(() => {
    setVal(props.value);
  }, [props.value]);

  const handleChange = (event,item) => {
    if(item?.value === val) return;
    setVal(item?.value);
    onChange && onChange(item?.value);
  };

  return (
    <View className={cls}>
      <View style={{padding:10,alignItems:'flex-start',display: 'flex'}}>
        {options?.map((item, i) =>{
          const {icon, text,butInt, ...other } = item;
          return( 
             <Button 
              key={item.value}
              className="button-groups-item" 
              style={{width:butInt<=2?'40%': butInt === 3? '30%' :'23%'}}
              onClick={(e)=>handleChange(e, item)} 
              type={val === item.value ?'primary': 'default'}
               {...other} 
            >
                {item?.icon}
                {item?.text}
            </Button>
          )
        })}
      </View>
    </View>
  );
});

export default ButtonGroups;