<template>
       <div class="z-upload" :class="{ 'is-drag': props.drag }" @click="handleClick">
              <template v-if="props.drag">
                     <div class="upload_dragger py-10 px-2.5" :class="{ 'is-dragger': dragover }" @drop.prevent="onDrop"
                            @dragover.prevent="onDragover" @dragleave.prevent="dragover = false">
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
              <input ref="inputRef" class="upload_input" name="file" :disabled="props.disabled" :multiple="multiple"
                     :accept="accept" type="file" @change="handleChange" @click.stop />
              <div class="upload_tip">
                     <slot name="tip"></slot>
              </div>
       </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';
/**
 * shallowRef ：想象你有一个文件夹，文件夹里有很多文件。shallowRef只会关注你是否更换了整个文件夹，而不会关心文件夹内部的文件是否被修改。
 */
import { shallowRef } from 'vue';
interface UploadRawFile extends File {
       uid: number
       isDirectory?: boolean
}
const slots = useSlots()
const props = withDefaults(
       defineProps<{
              modelValue: File[]

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
              onExceed?: (rawFile: File[]) => void
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
              listType: 'text'
       }
);
const emit = defineEmits<{
       (e: "update:modelValue", el: File[]): void;
}>();
const dragover = ref(false)
let fileList: File[] = []
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
       uploadFiles(Array.from(files))
}

const uploadFiles = (files: File[]) => {
       if (files.length === 0) return

       const { limit, multiple, onExceed } = props

       if (limit && props.modelValue.length + files.length > limit) {
              onExceed(files)
              return
       }

       if (!multiple) {
              files = files.slice(0, 1)
       }

       fileList.push(...files)
       emit('update:modelValue', fileList)
}

const onDrop = (e: DragEvent) => {
       if (props.disabled) return
       dragover.value = false
       e.stopPropagation()
       const files = Array.from(e.dataTransfer!.files) as UploadRawFile[]
       if (files.length === 0 && !files) return
       uploadFiles(files)

}
const onDragover = () => {
       if (!props.disabled) dragover.value = true
}
onMounted(() => {
       fileList = []
})
onUnmounted(() => {
       fileList = []
})
</script>

<style scoped lang="scss">
.z-upload {
       display: inline-flex;
       justify-content: center;
       align-items: center;
       cursor: pointer;
       outline: none;

       .upload_input {
              display: none;
       }

       .upload_tip {
              font-size: 12px;
              color: var(--color-text-regular);
              margin-top: 7px;
       }
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


.is-drag {
       display: block;
}
</style>