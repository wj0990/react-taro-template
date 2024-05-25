import React, { useState,useEffect ,forwardRef } from 'react';
import  { useDidHide, useDidShow } from "@tarojs/taro";
import { IconFont } from '@nutui/icons-react-taro'
import { Popup,Popover, } from '@nutui/nutui-react-taro';
import {  View,Text } from '@tarojs/components';
import { Tags, FormInput } from "@/components";
import SelectOptions from './SelectOption';
import Search from './Search';
import { debounce } from '@/utils/common';
import './index.scss';

const FormSelect = forwardRef((props, ref) => {
  // mode="multiple"
  // expandType: popover | drawer
  const {
    className,
    name, 
    value,
    placeholder= '请选择',
    expandProps,
    expandType="drawer",
    showSearch=false,
    optionKeys=['value','label'],
    mode='',
    options=[], 
    labelInValue,
    disabled,
    readonly=false,
    isAutoSearch=true, // 自动搜索
    showValueInOption = false,
    onChange,
    onSearch,
    ...other
  } = props;
  console.log('-----props---->',props)
  if(name === 'areaCode'){
  }
  const [visible, setVisible] = useState(false);
  // const [values, setValues] = useState(props.value);
  const [searchValue, setSearchValue] = useState('');
  const [labelList, setLabelList] = useState([]);
  const [itemsList, setItemList] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [valueName, labelName] = optionKeys;
  // 处理选择后的逻辑
  function handleConfirm(datas) {
    const data = {...datas};
    const { labels, items, checkedKeys: checkeds } = data;
    setLabelList(labels);
    setItemList(items);
    setVisible(false);
    setCheckedKeys(checkeds);
    let params = {}; 
    // mode 多选 
    if(mode) {
      params = labelInValue ? items.map(item=>{
        const data = {};
        const index =  optionKeys.findIndex((keyname)=>!!item[keyname]);
        if(index> -1){
          const keyName = optionKeys[index];
          data[keyName] = item[keyName];
        }
        return data;
      }) : 
      // 数组
        items.map(item=>{
          item[valueName]
          return item[valueName];
        });

      items.map(item=>(item[valueName]));
    }else{
      // 单选
      if(labelInValue){
        optionKeys.forEach(key=>{
          params[key] =items[0][key]
        })
      } else {
        params =items[0][valueName];
      }
    }
    onChange && onChange(params)
    // setValue && setValue(name, params);
  }

  const handleonCancel = () =>{
    setVisible(false);
  }

  const handleDelete = (event, i) => {
    const  newLabels = []
    const newCheckedKeys = [];
    const newItems = itemsList.filter((item, j)=>{
      if(i!==j){
        newLabels.push(item[labelName]);
        newCheckedKeys.push(item[valueName]);
        return true;
      }else{
        return false;
      }
    })
    setLabelList(newLabels);
    setItemList(newItems);
    setCheckedKeys(newCheckedKeys);
    event?.preventDefault();
    event?.stopPropagation();
    setVisible(false);
  }

  const renderSelectedValues = ()=>{
    // 单选
    if(!mode){
      return (<Text className="select-text">{labelList}</Text>)
    }
    if(mode==="tag"){
      return(<Tags closeable onDelete={handleDelete}labels={labelList} />)
    }
  }

  const handleSearch = (res) => {
    onSearch && onSearch(res);
    // console.log("Searching for:", inputValue);
    // 执行搜索操作，例如发送网络请求获取搜索结果
  };

  // 键盘触发 
  const handleKeyDown =(event,type)=> {
    console.log('-----type------->',type)
    if (event?.keyCode === 13 || event?.detail?.keyCode === 13) {
      handleSearch(event?.detail?.value);
    }
    if(type ==='search'){
      handleSearch(searchValue);
    }
  }
  const onChangeSearchValue = debounce((event) =>{
    const val = event?.tartget?.value || event;
    setSearchValue(val);
    isAutoSearch && handleSearch(val)
  },1000)

  useDidShow(() => {
    // Taro.onKeyboardHeightChange(handleSearch);
  });

  useDidHide(() => {
    // Taro.offKeyboardHeightChange(handleSearch);
  });

  useEffect(()=>{
    if(!value) return;
    const labels = [];
    let datas = [];
    const keys = [];
    const isArray = Array.isArray(value);
    const optionsValue = options?.map(item=>(item[valueName]||item )) || []; //select optionValue值
    // mode 多选 
    if(mode && isArray) {
      // 对象
      // let checkedKeys = []
      if(labelInValue){
        // checkedKeys = value.map(data=>(data[valueName]));
        value.forEach((item)=>{
          // options里存在存 option 否则直接取 value里的值
          const index = optionsValue.findIndex((option)=>option[valueName] ===item[valueName])
          const data = index >-1 ? options[i] : { ...item };
          datas.push(data); // 对象
          labels.push(data[labelName])
          keys.push(data[valueValue])
        }) 
        // 如果选择单个key
      }else{
        // 这里只有value值
        value.forEach((item)=>{
          // options里存在存 option 否则直接取 value里的值
          const index = options.findIndex((option)=>{
            return(option[valueName] ===item)
          });
          const data = index >-1 ? options[index] : { [labelName]:item, [valueName]:item };
          datas.push(data); // 对象
          labels.push(data[labelName])
          keys.push(data[valueValue])
        }) 
      }
    }else if(!mode && !isArray) {
      // 单选对象

      if(labelInValue && value){     
        const index = optionsValue.findIndex((option)=>option[valueName] ===value[valueName])
        datas = index >-1 ? options[index] : {...value}
      }else{
        // 单选值
        const index = optionsValue.findIndex((option)=>option === value);
        datas = index >-1 ? options[index] : [{[labelName]:value, [valueName]:value}]
      }
      labels.push(datas[labelName])
      keys.push(datas[valueName])
    }else{

    }
    setItemList(datas);
    setCheckedKeys(keys);
    setLabelList([...labels]);

  },[props.value, props.options])
  const renderSelectOptions= ()=>{
    const children = (
      <SelectOptions 
        mode={mode}
        showValue={showValueInOption}
        checkedKeys={checkedKeys}
        optionKeys={optionKeys}
        options={options}
        onCancel={handleonCancel}
        onConfirm={handleConfirm}
        // {...other}
      />)
    if(expandType=== 'drawer'){
      return (
        <Popup
          style={{height:"30%"}}
          visible={visible}
          onClose={() => {
            setVisible(false);
            setSearchValue('');
          }
          }
          position="bottom"
          {...expandProps}
        >
          <View className="select-search-popup-box">
            {showSearch && 
            <View
              className="select-search-popup-head"
            >
              <FormInput 
                value={searchValue}
                onKeyDown={handleKeyDown}
                onConfirm={(e)=>handleKeyDown(e, 'confirm')}
                onChange={onChangeSearchValue}
                focus 
              />
              <View 
                className="select-search-popup-head-left-icon"
                onTap={(e)=>handleKeyDown(e, 'search')}
              >
                <IconFont name="search" size="15" />
              </View>
            </View>
            } 
            {children}
          </View>
        </Popup>
      )
    }else if(expandType === 'popover') {
      return  <Popover 
        visible={visible} 
        overlayStyle="position: fixed; bottom: 0;"
        className="select-popover-wrap"
        // onClick={()=>{console.log('---onClickonClickonClick------->')}}
        // onClick={()=>{customized ? setCustomized(false) : setCustomized(true)}}>
      >
        <FormInput
          onFocus={()=>{
            setVisible(true)
          }}
          onBlur={()=>{
            setVisible(false)
          }}
          onConfirm={()=>{setVisible(false)}}
          onKeyDown={handleKeyDown}  
          {...props}
          onChange={onChangeSearchValue}
        />
        {visible ? children : undefined}
        {/* {
          customized ? 
          <div className="self-content" style={selfContentStyle}>
          {
            selfContent.map((item: any)=>{
              return <div className="self-content-item" style={selfContentItem} key={item.name}>
                <Icon name={item.name} size="15" />
                <div className="self-content-desc" style={selfContentDesc}>{ item.desc }</div>
              </div>
            })
          }
        </div> : ''
        } */}
      </Popover>
    }
  }
  const cls = [className,'select-wrap', readonly && 'select-wrap-readonly', disabled && `select-wrap-disabled` ].filter(Boolean).join(' ').trim();

  return (
    <View className={cls}>
      <View onClick={()=> (!disabled&& !readonly) && setVisible(true)} className="select-input-wrap">
        {(!labelList||labelList.length ===0) && <Text ref={ref} className="select-placeholder select-text">{placeholder}</Text>}
        {renderSelectedValues()}
      </View>
      {/* <FormInput ref={ref} onKeyDown={handleKeyDown} {...props} onChange={onChangeSearchValue} /> */}
      {renderSelectOptions()}
      {/* <Popup
        style={{height:"30%"}}
        visible={visible}
        onClose={() => setVisible(false)}
        position="bottom"
      >
        <SelectOptions onCancel={handleonCancel} onConfirm={handleConfirm} options={options} />
      </Popup> */}
    </View>
  );
})


FormSelect.Search = Search;
export default FormSelect;