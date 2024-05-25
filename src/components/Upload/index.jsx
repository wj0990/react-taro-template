import React,{ forwardRef,useRef, useMemo, useState, useEffect } from "react";
import { View, Image, MovableArea, MovableView } from '@tarojs/components';
import { PopupPro } from '@/components';
import Taro from '@tarojs/taro';
// import Uploader from '../nutui/uploader11';
import Uploader from './nutuiReactTaro/index.taro';
import './index.scss';
import './nutuiReactTaro/style/uploader.scss'


// 上传组件
const Upload = forwardRef((props, ref) => {
  const {title,isSingle, url, multiple=false, value,setValue, onChange,onBlur , uploadUrl, fieldProps={},options, ...others } = props;
  const [fileIds, setFileIds] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [scale, setScale] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const movableRef = useRef(null);
  const token = Taro.getStorageSync('userToken');
  const commonPath = 'https://wx.expiims.com';
  // const path = `http://58.210.105.5:37002/cms-basic-api/process/image/uploadProcessFile`;

  const path = `${commonPath}${url}`;

  const getHeader = useMemo(()=>{
    const header = {
      'Content-Type': 'multipart/form-data',
      // 'Origin': 'http://192.168.86.3:10086', // 设置请求头中的 Origin
      'Access-Control-Allow-Origin': '*', // 替换为您允许的域名或使用通配符 *
      'Accept':'*/*', 
      // 'Access-Control-Allow-Origin': '*',
      // 'Method':'POST',
      'token': token,
      'Token': token,
      // ...options.headers,
    }
    return header;
  },[])

  // const {  } = fieldProps;
  const onStart = () => {
    console.log('start 触发')
  }
  const handleOnChange =(file)=>{
    // form 表单
    if(props.setValue){
      // props.setValue(props.name, file)
    }else{
      // onChange && onChange(file)

    }
  }

  useEffect(()=>{
    let files =[];
    const downLoadUrl = '/api/cms-basic-api/file/download/byFilePath';
    // https://wx.expiims.com/api/cms-basic-api/file/download/byFilePath
    if(value){

      const ids = typeof(value) ==='string' ? [value] : value;
      files = ids.map((item, i)=>{
        return({
          name:item,
          status: 'success',
          type: 'image',
          url:`${commonPath}${downLoadUrl}?fileName=${item}`,
          message: '上传成功',
          uid: `${item}${i}`,

        })
      })
    }
    setFileList(files)
  },[value])

  useEffect(()=>{
    return(()=>{
      setFileList([]);
      setFileIds([]);
    })
  }, [])

  const onSuccess = (response, oldList) =>{
    const { responseText } = response;
    if(responseText?.statusCode ===200 && responseText.data){
      const responseData = responseText ? JSON.parse(responseText.data) : {};
      if(responseData.code ===200 && responseData.data){
        const jsonData = responseData.data; 
        let fileId,otherData;
        if(typeof(jsonData) ==='object'){
          fileId =  jsonData.vehicleLicenseImage || jsonData.imageUrl;
          otherData = jsonData; 
        }else{
          fileId = responseData.data;
        }
        if(fileId && !fileIds.includes(fileId)){
          const newList = [...fileIds, fileId];
          setFileIds(newList);
          onChange && onChange({fileIds: isSingle ? newList.toString(): newList,otherData});
        }
      }
    }
  }
  // 查看 
  const handlePreview = (file)=>{
    if(file){
      setPreviewImage(file.url);
      setPreviewVisible(true);
    }
  }
  // 关闭取消
  const handleCancel = ()=>{
    setPreviewVisible(false);
  }
  const handleDel = (file, fileList=[])=>{
    const fileIds = fileList.map(item=>(item.name))
    setFileIds(fileIds);
    onChange && onChange({ fileIds });
  }

  const handleScaleChange = (e) => {
    setScale(e.detail.scale);
  };
 
  const handleMoveChange = (e) => {
    const { x, y } = e.detail;
    const areaWidth = Taro.getSystemInfoSync().windowWidth;
    const areaHeight = Taro.getSystemInfoSync().windowHeight;
    const imageWidth = areaWidth * scale;
    const imageHeight = areaHeight * scale;

    if (x < 0) {
      setX(0);
    } else if (x > imageWidth - areaWidth) {
      setX(imageWidth - areaWidth);
    } else {
      setX(x);
    }

    if (y < 0) {
      setY(0);
    } else if (y > imageHeight - areaHeight) {
      setY(imageHeight - areaHeight);
    } else {
      setY(y);
    }
  };

  return (
    <View className="upload-wrap" style={{textAlign:'center'}} >
      <Uploader 
        // ref={ref}
        method="put"        
        data={{
          mode:'app',
          sysCode:'app'
        }}
        defaultValue={[...fileList]} // 不剩效
        deletable={!others?.readonly && !others?.disabled}
        {...others}
        multiple={multiple} 
        headers={{...getHeader}}
        url={path}
        onSuccess={(response)=>{
          onSuccess(response, fileList)
        }}
        onDelete={handleDel}
        onFailure={(e)=> {
        }}
        onFileItemClick={handlePreview}
        // beforeXhrUpload={beforeXhrUpload}
      />
      {title && <View className="upload-wrap-title">{title}</View>}
      <PopupPro 
        style={{height:'100%',backgroundColor:'#77777742', borderRadio:'inherit !important'}}
        visible={previewVisible} onClose={handleCancel}
        header={false}  
      >
        <View className="container">
          <MovableArea className="movable-area">
            <MovableView 
              ref={movableRef}
              className="movable-view"
              scale 
              scaleMin={1}
              direction="all"
              x={x}
              y={y}
              onScale={handleScaleChange}
              onChange={handleMoveChange}
            >
            <Image 
              className="image"
              style={{height:'100%',maxWidth:'100%'}}
              src={previewImage}
              onClick={handleCancel}
              mode="widthFix"
            />
            </MovableView>
          </MovableArea>
        </View>
      </PopupPro>
    </View>
  )
})

export default Upload;
