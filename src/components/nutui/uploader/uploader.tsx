import React, {
  useState,
  useImperativeHandle,
  ForwardRefRenderFunction,
  PropsWithChildren,
  useEffect,
  useRef
} from 'react'
import classNames from 'classnames'
import {
  Link as LinkIcon,
  Failure,
  Del,
  Photograph,
  Loading,
} from '@nutui/icons-react-taro'

import { Upload, UploadOptions } from './upload'
import { Progress } from '@nutui/nutui-react-taro'
import { funcInterceptor } from '../utils/interceptor'

import { BasicComponent, ComponentDefaults } from '../utils/typings'



export type FileType<T> = { [key: string]: T }

export type FileItemStatus =
  | 'ready'
  | 'uploading'
  | 'success'
  | 'error'
  | 'removed'

export interface UploaderProps extends BasicComponent {
  url: string
  maxCount: number
  maxFileSize: number
  defaultValue?: FileType<React.ReactNode>[]
  value?: FileType<string>[]
  previewType: 'picture' | 'list'
  fit: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  uploadIcon?: React.ReactNode
  uploadLabel?: React.ReactNode
  name: string
  accept: string
  disabled: boolean
  autoUpload: boolean
  multiple: boolean
  timeout: number
  data: any
  method: string
  xhrState: number | string
  headers: any
  withCredentials: boolean
  clearInput: boolean
  preview: boolean
  deletable: boolean
  capture: boolean
  className: string
  previewUrl?: string
  style: React.CSSProperties
  onStart?: (option: UploadOptions) => void
  onDelete?: (file: FileItem, fileList: FileItem[]) => void
  onSuccess?: (param: {
    responseText: XMLHttpRequest['responseText']
    option: UploadOptions
    fileList: FileItem[]
  }) => void
  onProgress?: (param: {
    e: ProgressEvent<XMLHttpRequestEventTarget>
    option: UploadOptions
    percentage: string | number
  }) => void
  onFailure?: (param: {
    responseText: XMLHttpRequest['responseText']
    option: UploadOptions
    fileList: FileItem[]
  }) => void
  onUpdate?: (fileList: FileItem[]) => void
  onOversize?: (file: File[]) => void
  onChange?: (param: {
    fileList: FileItem[]
    event: React.ChangeEvent<HTMLInputElement>
  }) => void
  beforeUpload?: (file: File[]) => Promise<File[] | boolean>
  beforeXhrUpload?: (xhr: XMLHttpRequest, options: any) => void
  beforeDelete?: (file: FileItem, files: FileItem[]) => boolean
  onFileItemClick?: (file: FileItem) => void
  onBeforeUpload?: (file: FileList | null) => boolean | FileList

}

const defaultProps = {
  ...ComponentDefaults,
  url: '',
  maxCount: 1,
  previewType: 'picture',
  fit: 'cover',
  name: 'file',
  accept: '*',
  disabled: false,
  autoUpload: true,
  multiple: false,
  maxFileSize: Number.MAX_VALUE,
  data: {},
  headers: {},
  method: 'post',
  xhrState: 200,
  timeout: 1000 * 30,
  withCredentials: false,
  clearInput: true,
  preview: true,
  deletable: true,
  capture: false,
  beforeDelete: () => {
    return true
  },
} as UploaderProps

export class FileItem {
  status: FileItemStatus = 'ready'

  message = '准备中..'

  uid: string = new Date().getTime().toString()

  name?: string

  url?: string

  type?: string

  path?: string

  percentage: string | number = 0

  formData: FormData = new FormData()

  responseText?: string
}

class UploadStore {

  private fileList: any[] = []

  private _update: Function = () => void 0;

  constructor(_update: Function, defaultValue: any) {
    this._update = _update
    this.fileList = defaultValue || []
  }

  getFileList = () => this.fileList || []

  setFileList = (list: any[]) => {
    this.fileList = list
    this._update(new Date().getTime())
  }
}

const InternalUploader: ForwardRefRenderFunction<
  unknown,
  PropsWithChildren<Partial<UploaderProps>>
> = (props, ref) => {
  const {
    children,
    uploadIcon,
    uploadLabel,
    name,
    accept,
    defaultValue,
    value,
    previewType,
    fit,
    disabled,
    multiple,
    url,
    previewUrl,
    headers,
    timeout,
    method,
    xhrState,
    withCredentials,
    data,
    preview,
    deletable,
    maxCount,
    capture,
    maxFileSize,
    className,
    autoUpload,
    clearInput,
    onStart,
    onDelete,
    onChange,
    onFileItemClick,
    onProgress,
    onSuccess,
    onUpdate,
    onFailure,
    onOversize,
    beforeUpload,
    beforeXhrUpload,
    beforeDelete,
    onBeforeUpload,
    ...restProps
  } = { ...defaultProps, ...props }
  const [_, _update] = useState()
  const updateRef = useRef(_update)
  updateRef.current = _update

  const store = useRef<UploadStore>(new UploadStore(updateRef.current, defaultValue))

  const fileList = store.current.getFileList()

  // const [fileList, setFileList] = useState<any>(defaultValue || [])
  const [uploadQueue, setUploadQueue] = useState<Promise<Upload>[]>([])

  useEffect(() => {
    if (value) {
      store.current.setFileList(value)
    }
  }, [value])

  const classes = classNames(className, 'nut-uploader')

  useImperativeHandle(ref, () => ({
    submit: () => {
      Promise.all(uploadQueue).then((res) => {
        res.forEach((i) => i.upload())
      })
    },
    clear: () => {
      clearUploadQueue()
    },
  }))

  const clearUploadQueue = (index = -1) => {
    if (index > -1) {
      uploadQueue.splice(index, 1)
      setUploadQueue(uploadQueue)
    } else {
      setUploadQueue([])
      const newList = store.current.getFileList()
      newList.splice(0, newList.length)
      store.current.setFileList(newList)
    }
  }

  const clearInputValue = (el: HTMLInputElement) => {
    el.value = ''
  }

  const executeUpload = (fileItem: FileItem, index: number) => {
    const uploadOption = new UploadOptions()
    uploadOption.url = url
    for (const [key, value] of Object.entries<string | Blob>(data)) {
      fileItem.formData.append(key, value)
    }
    uploadOption.formData = fileItem.formData
    uploadOption.timeout = timeout * 1
    uploadOption.method = method
    uploadOption.xhrState = xhrState
    uploadOption.headers = headers
    uploadOption.withCredentials = withCredentials
    uploadOption.beforeXhrUpload = beforeXhrUpload
    try {
      uploadOption.sourceFile = fileItem.formData.get(name)
    } catch (error) {
      console.warn(error)
    }
    uploadOption.onStart = (option: UploadOptions) => {
      clearUploadQueue(index)
      const newList = store.current.getFileList()
      newList.forEach((item) => {
        if (item.uid === fileItem.uid) {
          item.status = 'ready'
          item.message = "准备上传"
        }
      })
      store.current.setFileList(newList)
      onStart && onStart(option)
    }
    uploadOption.onProgress = (
      e: ProgressEvent<XMLHttpRequestEventTarget>,
      option: UploadOptions
    ) => {
      const newList = store.current.getFileList()
      newList.forEach((item) => {
        if (item.uid === fileItem.uid) {
          item.status = 'uploading'
          item.message = "上传中"
          item.percentage = ((e.loaded / e.total) * 100).toFixed(0)
          onProgress && onProgress({ e, option, percentage: item.percentage })
        }
      })
      store.current.setFileList(newList)
    }
    uploadOption.onSuccess = (
      responseText: XMLHttpRequest['responseText'],
      option: UploadOptions
    ) => {
      const newList = store.current.getFileList()
      newList.forEach((item) => {
        if (item.uid === fileItem.uid) {
          item.status = 'success'
          item.message = "上传成功"
          item.responseText = responseText
        }
      })
      onUpdate && onUpdate(newList)
      store.current.setFileList(newList)
      onSuccess &&
        onSuccess({
          responseText,
          option,
          fileList: newList,
        })
    }
    uploadOption.onFailure = (
      responseText: XMLHttpRequest['responseText'],
      option: UploadOptions
    ) => {
      const newList = store.current.getFileList()
      newList.forEach((item) => {
        if (item.uid === fileItem.uid) {
          item.status = 'error'
          item.message = "上传失败"
          item.responseText = responseText
        }
      })
      store.current.setFileList(newList)
      onFailure &&
        onFailure({
          responseText,
          option,
          fileList: newList,
        })
    }
    const task = new Upload(uploadOption)
    if (props.autoUpload) {
      task.upload()
    } else {
      uploadQueue.push(
        new Promise((resolve) => {
          resolve(task)
        })
      )
      setUploadQueue(uploadQueue)
    }
  }

  const readFile = (files: File[]) => {
    files.forEach((file: File, index: number) => {
      const formData = new FormData()
      formData.append(name, file)
      const fileItem = new FileItem()
      fileItem.name = file.name
      fileItem.status = 'ready'
      fileItem.type = file.type
      fileItem.formData = formData
      fileItem.uid = file.lastModified + fileItem.uid

      if (autoUpload) {
        fileItem.message = "准备上传"
      } else {
        fileItem.message = "等待上传"
      }

      executeUpload(fileItem, index)

      if (preview && file.type.includes('image')) {
        const reader = new FileReader()
        reader.onload = (event: ProgressEvent<FileReader>) => {
          fileItem.url = (event.target as FileReader).result as string
        }
        const newList = store.current.getFileList()
        newList.push(fileItem as any)
        store.current.setFileList(newList)
        reader.readAsDataURL(file)
      } else {
        const newList = store.current.getFileList()
        newList.push(fileItem as any)
        store.current.setFileList(newList)
      }
    })
  }

  const filterFiles = (files: File[]) => {
    const maximum = (props.maxCount as number) * 1
    const oversizes = new Array<File>()
    const filterFile = files.filter((file: File) => {
      if (file.size > maxFileSize) {
        oversizes.push(file)
        return false
      }
      return true
    })
    if (oversizes.length) {
      onOversize && onOversize(files)
    }

    if (filterFile.length > maximum) {
      filterFile.splice(maximum, filterFile.length - maximum)
    }
    const newList = store.current.getFileList()
    if (newList.length !== 0) {
      const index = maximum - newList.length
      filterFile.splice(index, filterFile.length - index)
    }

    return filterFile
  }

  const deleted = (file: FileItem, index: number) => {
    const newList = store.current.getFileList()
    newList.splice(index, 1)
    onDelete && onDelete(file, newList)
    store.current.setFileList(newList)
  }

  const onDeleteItem = (file: FileItem, index: number) => {
    clearUploadQueue(index)
    const newList = store.current.getFileList()
    funcInterceptor(beforeDelete, {
      args: [file, newList],
      done: () => deleted(file, index),
    })
  }

  const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return
    }
    const $el = event.target

    const { files } = $el
    let newList: any = files
    if (typeof onBeforeUpload === "function") {
      const result = onBeforeUpload(files)
      if (result && typeof result !== "boolean") {
        newList = result
      } else if (result === true) {
        newList = files
      } else {
        /**阻止提交*/
        return
      }
    }

    if (beforeUpload) {
      beforeUpload(new Array<File>().slice.call(newList)).then(
        (f: Array<File> | boolean) => {
          const _files: File[] = filterFiles(new Array<File>().slice.call(f))
          readFile(_files)
        }
      )
    } else {
      const _files = filterFiles(new Array<File>().slice.call(newList))
      readFile(_files)
    }
    const newLists = store.current.getFileList()
    console.log("newLists", newLists.length)
    onChange && onChange({ fileList: newLists, event })

    if (clearInput) {
      clearInputValue($el)
    }
  }

  const handleItemClick = (file: FileItem) => {
    onFileItemClick && onFileItemClick(file)
  }

  return (
    <div className={classes} {...restProps}>
      {children && (
        <div className="nut-uploader__slot">
          <>
            {children}
            {maxCount > fileList.length && (
              <>
                {capture ? (
                  <input
                    className="nut-uploader__input"
                    type="file"
                    capture="user"
                    name={name}
                    accept={accept}
                    disabled={disabled}
                    multiple={multiple}
                    onChange={fileChange}
                  />
                ) : (
                  <input
                    className="nut-uploader__input"
                    type="file"
                    name={name}
                    accept={accept}
                    disabled={disabled}
                    multiple={multiple}
                    onChange={fileChange}
                  />
                )}
              </>
            )}
          </>
        </div>
      )}

      {fileList.length !== 0 &&
        fileList.map((item: any, index: number) => {
          return (
            <div
              className={`nut-uploader__preview ${previewType}`}
              key={item.uid}
            >
              {previewType === 'picture' && !children && (
                <div className="nut-uploader__preview-img">
                  {deletable && (
                    <Failure
                      color="rgba(0,0,0,0.6)"
                      className="close"
                      onClick={() => onDeleteItem(item, index)}
                    />
                  )}

                  {item.status === 'ready' ? (
                    <div className="nut-uploader__preview__progress">
                      <div className="nut-uploader__preview__progress__msg">
                        {item.message}
                      </div>
                    </div>
                  ) : (
                    item.status !== 'success' && (
                      <div className="nut-uploader__preview__progress">
                        {item.failIcon !== ' ' &&
                          item.loadingIcon !== ' ' &&
                          (item.status === 'error'
                            ? item.failIcon || <Failure color="#fff" />
                            : item.loadingIcon || (
                              <Loading
                                className="nut-icon-loading"
                                color="#fff"
                              />
                            ))}
                        <div className="nut-uploader__preview__progress__msg">
                          {item.message}
                        </div>
                      </div>
                    )
                  )}

                  {item.type.includes('image') ? (
                    <>
                      {item.url && (
                        <img
                          className="nut-uploader__preview-img__c"
                          style={{ objectFit: fit }}
                          src={item.url}
                          alt=""
                          onClick={() => handleItemClick(item)}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      {previewUrl ? (
                        <img
                          className="nut-uploader__preview-img__c"
                          src={previewUrl}
                          alt=""
                          onClick={() => handleItemClick(item)}
                        />
                      ) : (
                        <div className="nut-uploader__preview-img__file">
                          <div
                            onClick={() => handleItemClick(item)}
                            className="nut-uploader__preview-img__file__name"
                          >
                            <LinkIcon color="#808080" />
                            &nbsp;
                            {item.name}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  {item.status === 'success' ? (
                    <div className="tips">{item.name}</div>
                  ) : null}
                </div>
              )}

              {previewType === 'list' && (
                <div className="nut-uploader__preview-list">
                  <div
                    className={`nut-uploader__preview-img__file__name ${item.status}`}
                    onClick={() => handleItemClick(item)}
                  >
                    <LinkIcon />
                    &nbsp;{item.name}
                  </div>
                  {deletable && (
                    <Del
                      color="#808080"
                      className="nut-uploader__preview-img__file__del"
                      onClick={() => onDeleteItem(item, index)}
                    />
                  )}

                  {item.status === 'uploading' && (
                    <Progress
                      percent={item.percentage}
                      color="linear-gradient(270deg, rgba(18,126,255,1) 0%,rgba(32,147,255,1) 32.815625%,rgba(13,242,204,1) 100%)"
                      showText={false}
                    />
                  )}
                </div>
              )}
            </div>
          )
        })}

      {maxCount > fileList.length && previewType === 'picture' && !children && (
        <div
          className={`nut-uploader__upload ${previewType} ${disabled ? 'nut-uploader__upload-disabled' : ''
            }`}
        >
          <div className="nut-uploader__icon">
            {uploadIcon || (
              <Photograph width="20px" height="20px" color="#808080" />
            )}
            <span className="nut-uploader__icon-tip">{uploadLabel}</span>
          </div>

          {capture ? (
            <input
              className="nut-uploader__input"
              type="file"
              capture="user"
              name={name}
              accept={accept}
              disabled={disabled}
              multiple={multiple}
              onChange={fileChange}
            />
          ) : (
            <input
              className="nut-uploader__input"
              type="file"
              name={name}
              accept={accept}
              disabled={disabled}
              multiple={multiple}
              onChange={fileChange}
            />
          )}
        </div>
      )}
    </div>
  )
}

export const Uploader = React.forwardRef(InternalUploader)

Uploader.defaultProps = defaultProps
Uploader.displayName = 'NutUploader'
