// validation.js
import * as yup from 'yup';

// const requiredRule = (label) => ({
//   required: {
//     value: true,
//     message: `${label}不能为空`,
//   },
// });

// const limitRule = (label, min, max) => ({
//   min: {
//     value: min,
//     message: `${label}不能小于${min}`,
//   },
//   max: {
//     value: max,
//     message: `${label}不能大于${max}`,
//   },
// });
/**匹配验证信息 */
export const getPromptMsg =(type, label)=>{
  let text = '请输入';
  switch(type){
    case 'select':
    case 'radio': text ='请选择';break;
    case 'searchSite': text ='搜索';break;
    case 'upload': text ='上传';break;
    default: break;
  }
  return `${text}${label}`;
}
/**获取匹配规则 */
const getSchema = ({rule, name, schema, msg, item})=>{
  const { mode,isSingle, maxCount, multiple,type } = item?.fieldProps || {};
  const labelInValue = item?.fieldProps?.labelInValue ||item.labelInValue;
  // 必选
  if(rule.required){
    //输入为数组多选
    if((mode || multiple) || (!isSingle && maxCount>0)|| type ==='upload'){
      if(type ==='textarea'){
        console.log('--------1------->',mode || multiple)
      }
      // 数组对象
      if(labelInValue){
        if(type ==='textarea'){
          console.log('--------2------->')
        }
        schema[name] = yup.object().shape({
          [name]: yup.mixed().required(msg)
          
        });
        return; 
      }else{
        if(type ==='textarea'){
          console.log('--------3------>')
        }
        schema[name] = yup.array().min(1).required(msg);
        return; 
      }
    }else{
      // 验证对象
      if(labelInValue){
        if(type ==='textarea'){
          console.log('--------4------>')
        }
        schema[name] = yup.object().test('defined', msg, (value) => value !== undefined);
        return; 
      }else{
        if(type ==='textarea'){
          console.log('--------5------>')
        }
        // 验证对象字符串
        schema[name] = yup.string().required(msg);
      }
    }
  }
  if(rule.maxLength &&  isNumber(maxLength)){
    schema[name] = yup.string().max(maxLength, msg || `不能超过${maxLength}个字符`).required();
    return;
  }
  if(rule.minLength &&  isNumber(rule.minLength)){
    schema[name] = yup.string().min(rule.minLength, msg || `不能少余${rule.minLength}个字符`).required();
    return;
  }
  if(rule.min ||rule.min===0 && isNumber(rule.min)){
    schema[name] = yup.number().min(rule.min, msg || `不能小于${rule.min}`)
    return;
  }
  if(rule.max ||rule.max===0 && isNumber(rule.max)){
    schema[name] = yup.number().max(rule.min, msg || `不能小于${rule.min}`)
  }
  if(rule.pattern){
    schema[name] = yup.string().matches(rule.pattern, msg).required();
    return;
  }
}

export const generateValidationSchema = (fieldList=[]) => {
  const schema = {};
  fieldList.forEach(item => {
    const { name, type, rules, label } = item;
    if(rules){
      // rules为数组
      if( Array.isArray(rules)){
        rules.forEach(rule=> {
          const msg = rule.message || getPromptMsg(type, label);
          getSchema({rule ,name,schema, msg, item});
        })
      }else{
        // rules 数组
        const rule = item.rules;
        const msg = rule.required ? rule.required : getPromptMsg(type, label);
        getSchema({rule ,name, schema, msg, item});
      }
    }
  })
  return yup.object().shape(schema);
  // return yup.object().shape({
  //   username: yup.string().required(),
  // });

  // Object.keys(fieldList).forEach((key) => {
  //   const field = fieldList[key];
  //   const label = field.label || key;

  //   let validator = yup.string();
   

  //   if (field?.rules?.isRequired) {
  //     validator = validator.concat(yup.string().required(requiredRule(label)));
  //   }

  //   if (field?.rules?.minLength) {
  //     validator = validator.concat(yup.string().min(field.minLength, limitRule(label, field.minLength, field.maxLength)));
  //   }

  //   if (field?.rules?.maxLength) {
  //     validator = validator.concat(yup.string().max(field.maxLength, limitRule(label, field.minLength, field.maxLength)));
  //   }
    
  //   if (field?.rules?.customValidator) {
  //     validator = validator.test(field.customValidator);
  //   }
  //   schema[key] = validator;
  // });
  // console.log('------schemaschema---->',schema)
  // return yup.object().shape(schema);
};
