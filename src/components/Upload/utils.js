// 获取图片
export const formateImageField = (response) => {
  let fileName = ''
  if (!response.fileName) {
    const index = response?.path?.lastIndexOf('/')
    fileName = response?.path?.substring(index + 1)
  } else {
    const index = response?.path?.lastIndexOf('.')
    const fileIndex = response.fileName?.lastIndexOf('.')
    const pathLastName = response.path.substring(index + 1)
    const fileLastName = response.path.substring(fileIndex + 1)
    if (pathLastName !== fileLastName) {
      fileName = `${response.fileName}.${pathLastName}`;
    } else {
      fileName = response.fileName
    }
  }
  let file = {
    uri: response.uri || response.path,
    type: 'image/jpg',
    handleType: response.type,
    handlename: fileName,
    name:fileName,
  }
  return {
    ...response,
    ...file
  }
} 