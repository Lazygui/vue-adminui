import { ref, render, createVNode } from "vue";
import ZToast from "./ZToast.vue";

/**
 * 唯一全局容器
 */
let toastContainer: HTMLElement | null = null;
const BASE_OFFEST = 5;
const toasts = ref<any[]>([]);
const createToaster = () => {
       if (!toastContainer) {
              toastContainer = document.createElement("div");
              toastContainer.id = "_rht_toaster";
              toastContainer.style.position = "fixed";
              toastContainer.style.inset = "16px";
              toastContainer.style.zIndex = "9999";
              toastContainer.style.pointerEvents = "none";
              document.body.appendChild(toastContainer);
       }
};

createToaster();

const showToast = async (message: string) => {
       // 为弹窗分配一个唯一的 ID
       const id = Date.now().toString();

       const vnode = createVNode(ZToast, {
              id,
              message,
              offset: 0,
              leaveOffset: 0
       });
       // 创建一个容器来挂载虚拟节点
       const container = document.createElement("div");
       container.id = `toast-${id}`;

       // 将虚拟节点渲染到容器中
       render(vnode, container);

       if (toasts.value.length > 0) {
              updateOffsets();
       }
       toastContainer!.appendChild(container);
       toasts.value.unshift({ id, container });
       setTimeout(() => {
              // 从列表中移除当前弹窗
              toasts.value = toasts.value.filter((toast) => toast.id !== id);
              // 销毁组件并移除 DOM 节点
              render(null, container);
              container.remove();
       }, 3500);
};
const updateOffsets = () => {
       let totalOffset = 0; // 初始偏移量，根据需要调整
       toasts.value.forEach((toast) => {
              const height = toast.container.firstElementChild.clientHeight;

              const vnode = createVNode(ZToast, {
                     message: toast.container.innerText || "",
                     id: toast.container.id,
                     offset: totalOffset + height + BASE_OFFEST
              });
              render(vnode, toast.container);
              totalOffset += height + BASE_OFFEST;
       });
};
const error = (message: string) => {
       showToast(message);
};

export default { error };
