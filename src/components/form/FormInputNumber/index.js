import { Input } from '@nutui/nutui-react-taro';
import { useState, useEffect } from 'react';
import Short from './Short'

export default function FormInputNumber(props) {
  const { precision = 0 } = props
  const [value, setvalue] = useState();

  useEffect(() => {
    setvalue(props.value);
  }, [props.value]);

  const onChange = (value) => {

    let regex;
    if (precision > 0) {
      // 如果定义了小数位数，允许小数点
      regex = new RegExp("^\\d*\\.?\\d{0," + precision + "}$");
    } else {
      // 如果小数位数为0，不允许小数点
      regex = /^\d*$/;
    }

    console.log("【 !regex.test(value) 】==>", !regex.test(value));
    if (value && !regex.test(value)) {
      return;
    }

    setvalue(value);
    props?.onChange?.(value);
  }


  return (
    <Input {...props} defaultValue={value} onChange={onChange} type="digit" inputAlign="right" />
  );
}

FormInputNumber.Short = Short
