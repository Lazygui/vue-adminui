<template>
       <div class="file-upload">
              <!-- 上传区域 -->
              <div class="upload-area" @dragover.prevent="onDragOver" @dragleave="onDragLeave" @drop.prevent="onDrop"
                     :class="{ 'drag-over': isDragOver }">
                     <p>将文件拖拽到此处或</p>
                     <button class="btn btn-primary" @click="triggerFileInput">点击上传</button>
              </div>
              <input type="file" ref="fileInput" @change="onFileChange" style="display: none" />

              <!-- 错误提示 -->
              <div v-if="errorMessage" class="text-error">{{ errorMessage }}</div>

              <!-- 文件列表 -->
              <div v-if="fileList.length > 0" class="file-list">
                     <div v-for="(file, index) in fileList" :key="index" class="file-item">
                            <!-- 图片模式 -->
                            <div v-if="listType === 'picture' && isImage(file)">
                                   <img :src="getImagePreview(file)" alt="Preview" class="file-preview" />
                                   <div class="file-info">
                                          <p>{{ file.name }}</p>
                                          <p>{{ formatFileSize(file.size) }}</p>
                                   </div>
                            </div>
                            <!-- 文字模式 -->
                            <div v-else>
                                   <p>{{ file.name }}</p>
                                   <p>{{ formatFileSize(file.size) }}</p>
                                   <p>{{ file.type }}</p>
                            </div>
                            <button class="btn btn-error btn-sm" @click="removeFile(index)">删除</button>
                     </div>
              </div>
       </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Props
const props = defineProps({
       maxSize: {
              type: Number,
              default: null, // 默认不限制文件大小
       },
       allowedTypes: {
              type: Array as () => string[],
              default: () => [], // 默认不限制文件类型
       },
       listType: {
              type: String as () => 'text' | 'picture',
              default: 'text',
       },
});

// Emits
const emit = defineEmits(['upload-success']);

// Refs
const fileInput = ref<HTMLInputElement | null>(null);
const isDragOver = ref(false);
const errorMessage = ref('');
const fileList = ref<File[]>([]);

// 将简化的文件类型转换为 MIME 类型
const mimeTypes = computed(() => {
       const typeMap: Record<string, string[]> = {
              jpg: ['image/jpeg'],
              png: ['image/png'],
              svg: ['image/svg+xml'],
              mp4: ['video/mp4'],
              pdf: ['application/pdf'],
              // 可以根据需要扩展更多类型
       };

       return props.allowedTypes.reduce((acc, type) => {
              const mime = typeMap[type.toLowerCase()];
              if (mime) {
                     acc.push(...mime);
              }
              return acc;
       }, [] as string[]);
});

// Methods
const triggerFileInput = () => {
       fileInput.value?.click();
};

const onDragOver = () => {
       isDragOver.value = true;
};

const onDragLeave = () => {
       isDragOver.value = false;
};

const onDrop = (event: DragEvent) => {
       isDragOver.value = false;
       const files = event.dataTransfer?.files;
       if (files && files.length > 0) {
              handleFile(files[0]);
       }
};

const onFileChange = (event: Event) => {
       const input = event.target as HTMLInputElement;
       if (input.files && input.files.length > 0) {
              handleFile(input.files[0]);
       }
};

const handleFile = (file: File) => {
       // 校验文件类型
       if (mimeTypes.value.length > 0 && !mimeTypes.value.includes(file.type)) {
              errorMessage.value = `文件类型不支持，仅支持以下类型：${props.allowedTypes.join(', ')}`;
              return;
       }

       // 校验文件大小
       if (props.maxSize !== null && file.size > props.maxSize) {
              errorMessage.value = `文件大小超过限制，最大允许 ${formatFileSize(props.maxSize)}`;
              return;
       }

       errorMessage.value = '';

       if (props.listType) {
              // 列表模式：追加文件
              fileList.value.push(file);
       } else {
              // 单文件模式：覆盖文件
              fileList.value = [file];
       }

       emit('upload-success', file);
};

const removeFile = (index: number) => {
       fileList.value.splice(index, 1);
};

const isImage = (file: File) => {
       return file.type.startsWith('image/');
};

const getImagePreview = (file: File) => {
       return URL.createObjectURL(file);
};

const formatFileSize = (size: number) => {
       if (size < 1024) return `${size} B`;
       if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
       return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};
</script>

<style scoped lang="scss">
.file-upload {
       text-align: center;

       .upload-area {
              border: 2px dashed #ccc;
              padding: 20px;
              border-radius: 8px;
              cursor: pointer;

              &.drag-over {
                     border-color: #4caf50;
              }
       }

       .btn {
              margin-top: 10px;
       }

       .text-error {
              color: #ff0000;
              margin-top: 10px;
       }

       .file-list {
              margin-top: 20px;

              .file-item {
                     display: flex;
                     align-items: center;
                     justify-content: space-between;
                     padding: 10px;
                     border: 1px solid #ccc;
                     border-radius: 8px;
                     margin-bottom: 10px;

                     .file-preview {
                            max-width: 100px;
                            max-height: 100px;
                            border-radius: 8px;
                     }

                     .file-info {
                            margin-left: 10px;
                     }
              }
       }
}
</style>