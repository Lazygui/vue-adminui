<template>
       <div class="z-upload" :class="props.class">
              <div class="z-upload-content" :class="{ 'is-drag': props.drag }" @click="handleClick">
                     <template v-if="props.drag">
                            <div class="upload_dragger py-10 px-2.5" :class="{ 'is-dragger': dragover }"
                                   @drop.prevent="onDrop" @dragover.prevent="onDragover"
                                   @dragleave.prevent="dragover = false">
                                   <div v-if="!slots.default">
                                          <i class="upload-icon">
                                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                                        <path fill="currentColor"
                                                               d="M544 864V672h128L512 480 352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64 624c0-123.136 93.12-223.488 212.608-237.248A239.808 239.808 0 0 1 512 192a239.872 239.872 0 0 1 235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6z">
                                                        </path>
                                                 </svg>
                                          </i>
                                          <div class="upload-text">
                                                 拖拽文件到这里 或 <em>点击上传</em>
                                          </div>
                                   </div>
                                   <slot v-else></slot>
                            </div>
                     </template>
                     <template v-else>
                            <slot></slot>
                     </template>
                     <input ref="inputRef" class="upload_input" name="file" :disabled="props.disabled"
                            :multiple="multiple" :accept="accept" type="file" @change="handleChange" @click.stop />
              </div>
              <div class="upload_tip">
                     <slot name="tip"></slot>
              </div>
              <transition-group name="upload-list" tag="ul" class="upload-list" @click="handleDelete">
                     <li class="upload-list__item" v-for="item in fileList" :key="item.uid" :data-id="`${item.uid}`">
                            <div class="upload-list__item-info">
                                   <img :src="item.url" alt="" class="upload-list__item-img"
                                          v-if="props.listType === 'picture'">
                                   <i class="upload-list__item-icon" v-else>
                                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                                 <path fill="currentColor"
                                                        d="M832 384H576V128H192v768h640zm-26.496-64L640 154.496V320zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32m160 448h384v64H320zm0-192h160v64H320zm0 384h384v64H320z">
                                                 </path>
                                          </svg>
                                   </i>
                                   <span class="upload-list__name" :title="item.file.name">{{ item.file.name }}</span>
                            </div>
                            <i class="upload-list__item-icon-error" :data-id="`${item.uid}`">
                                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                          <path fill="currentColor"
                                                 d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z">
                                          </path>
                                   </svg>
                            </i>
                     </li>
              </transition-group>
       </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';
/**
 * shallowRef ：想象你有一个文件夹，文件夹里有很多文件。shallowRef只会关注你是否更换了整个文件夹，而不会关心文件夹内部的文件是否被修改。
 */
import { shallowRef } from 'vue';
interface UploadFile {
       uid: number
       file: File
       url: string
}

interface UploadUserFile extends UploadFile {
       name: string
}
const slots = useSlots()
const props = withDefaults(
       defineProps<{
              modelValue: File[]
              class?: string
              /**
               * 上传数量限制
               * @type  {number}
               */
              limit?: number

              /**
               * 是否支持拖拽上传
               * @type  {boolean}
               */
              drag?: boolean
              /**
               * 禁用上传
               * @type  {boolean}
               */
              disabled?: boolean

              /**
               * 文件多选
               * @type  {boolean}
               */
              multiple?: boolean
              accept?: string
              /**
               * 超出上传数量时的钩子
               * @param rawFile File[]
               */
              onExceed?: (rawFile: UploadFile[]) => void

              /**
               * 点击文件列表时的钩子
               * @param rawFile File[]
               */
              onPreview?: (rawFile: UploadUserFile) => void
              /**
               * 文件展示列表类型
               * @type {'text' | 'picture'}
               * @default 'text'
               */
              listType?: 'text' | 'picture'
       }>(),
       {
              drag: false,
              disabled: false,
              multiple: false,
              accept: '',
              onExceed: () => { },
              listType: 'text',
              class: '',
              onPreview: () => { },
       }
);
const emit = defineEmits<{
       (e: "update:modelValue", el: UploadFile[]): void;
}>();
const dragover = ref(false)
const fileList = ref<UploadFile[]>([])
const inputRef = shallowRef<HTMLInputElement>()
const handleClick = () => {
       if (!props.disabled) {
              inputRef.value!.value = ''
              inputRef.value!.click()
       }
}
const handleChange = (e: Event) => {
       const files = (e.target as HTMLInputElement).files
       if (!files) return
       uploadFiles(Array.from(files).map((item: File, index: number): UploadFile => {
              return {
                     uid: Date.now() + index,
                     file: item,
                     url: URL.createObjectURL(item)
              }
       }))
}

const uploadFiles = (files: UploadFile[]) => {
       if (files.length === 0) return

       const { limit, multiple, onExceed } = props

       if (limit && props.modelValue.length + files.length > limit) {
              onExceed(files)
              return
       }

       if (!multiple) {
              files = files.slice(0, 1)
       }
       fileList.value.push(...files)
       emit('update:modelValue', fileList.value)
}

const onDrop = (e: DragEvent) => {
       if (props.disabled) return
       dragover.value = false
       e.stopPropagation()
       const files: UploadFile[] = Array.from(e.dataTransfer!.files).map((item: File, index: number): UploadFile => {
              return {
                     uid: Date.now() + index,
                     file: item,
                     url: URL.createObjectURL(item)
              }
       })
       if (files.length === 0 && !files) return
       uploadFiles(files)

}
const onDragover = () => {
       if (!props.disabled) dragover.value = true
}
const toUploadUserFile = (file: UploadFile): UploadUserFile => {
       const itemFile: UploadUserFile = {
              name: file.file.name,
              ...file
       }
       return itemFile
}
const handleDelete = (event: MouseEvent) => {
       const target = event.target as HTMLElement;

       // 提取获取元素和 ID 的逻辑
       const getElementAndId = (selector: string) => {
              const element = target.closest(selector) as HTMLElement | null;
              if (!element) return null;
              const id = Number(element.dataset.id);
              return { element, id };
       };

       // 处理错误图标点击
       const errorIconData = getElementAndId('.upload-list__item-icon-error');
       if (errorIconData) {
              fileList.value = fileList.value.filter(item => item.uid !== errorIconData.id);
              return; // 提前返回，避免嵌套
       }

       // 处理文件项点击
       const fileItemData = getElementAndId('.upload-list__item');
       if (fileItemData) {
              const file = fileList.value.find(item => item.uid === fileItemData.id);
              if (file) {
                     const uerFile: UploadUserFile = toUploadUserFile(file)
                     props.onPreview(uerFile);
              }
       }
};
onMounted(() => {
       fileList.value = []
})
onUnmounted(() => {
       fileList.value = []
})
</script>

<style scoped lang="scss">
.z-upload {

       .z-upload-content {
              display: inline-flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              outline: none;

              .upload_input {
                     display: none;
              }

              .upload_dragger {
                     background-color: var(--color-base-100);
                     border: 1px dashed var(--color-border-secondary);
                     border-radius: 6px;
                     box-sizing: border-box;
                     text-align: center;
                     cursor: pointer;
                     position: relative;
                     overflow: hidden;

                     &:hover {
                            border-color: var(--color-primary);
                     }

                     .upload-icon {
                            height: 1em;
                            width: 1em;
                            display: inline-flex;
                            justify-content: center;
                            align-items: center;
                            position: relative;
                            fill: currentColor;
                            font-size: 67px;
                            color: #a8abb2;
                            margin-bottom: 16px;
                            line-height: 50px;
                     }

                     .upload-text {
                            color: var(--color-text-regular);
                            font-size: 14px;
                            text-align: center;

                            &>em {
                                   color: #409eff;
                                   font-style: normal;
                            }

                     }
              }

              .is-dragger {
                     background-color: rgb(235.9, 245.3, 255);
                     border: 2px dashed var(--color-primary);
              }
       }

       .upload_tip {
              font-size: 12px;
              color: var(--color-text-regular);
              margin-top: 7px;
       }

       .is-drag {
              display: block;
       }


       .upload-list {
              margin: 10px 0 0;
              padding: 0;
              list-style: none;
              position: relative;


              .upload-list__item {
                     cursor: pointer;
                     display: inline-flex;
                     align-items: center;
                     padding: 4px;
                     transition: all .5s cubic-bezier(.55, 0, .1, 1);
                     font-size: 14px;
                     color: var(--color-text-regular);
                     margin-bottom: 5px;
                     position: relative;
                     box-sizing: border-box;
                     border-radius: 4px;
                     width: 100%;

                     &:hover {
                            background-color: var(--color-text-900);
                            color: rgb(112, 176, 243);
                     }



                     .upload-list__item-info {
                            transition: all .3s;
                            display: inline-flex;
                            align-items: center;
                            width: calc(100% - 30px);
                            margin-left: 4px;
                            pointer-events: none;

                            .upload-list__item-icon {
                                   height: 1em;
                                   width: 1em;
                                   margin-right: 6px;
                                   color: var(--color-icon-secondary);
                            }

                            .upload-list__name {
                                   font-size: 14px;
                            }

                            .upload-list__item-img {
                                   margin-right: 4px;
                                   display: inline-flex;
                                   justify-content: center;
                                   align-items: center;
                                   width: 70px;
                                   height: 70px;
                                   object-fit: contain;
                                   position: relative;
                                   z-index: 1;
                            }

                            &>img {
                                   max-width: 100%;
                                   border-style: none;
                            }
                     }



                     .upload-list__item-icon-error {
                            height: 1em;
                            width: 1em;
                            margin-right: 6px;
                            color: initial;

                            &:hover {
                                   color: var(--color-error);
                            }
                     }
              }
       }



       /* 入场动画 */
       .upload-list-enter-active,
       .upload-list-leave-active {
              transition: all 0.5s ease;
       }

       .upload-list-enter-from,
       .upload-list-leave-to {
              opacity: 0;
              transform: translateY(-20px);
       }

       /* 确保离开的元素不占用空间 */
       .upload-list-leave-active {
              position: absolute;
       }
}
</style>