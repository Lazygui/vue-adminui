/**
 * 音频录制类
 * 使用 RecordRTC 库实现音频录制功能，支持实时音频数据处理
 * 作者: zhouzhijun
 * 
 * 功能：
 * 1. 开始录音
 * 2. 停止录音
 * 3. 将录制的音频数据转换为 Base64 格式
 * 4. 提供外部监听实时音频数据的回调函数
 * 
 * 示例用法：
 * const audioRecord = new AudioRecord((data) => {
 *     console.log("实时音频数据:", data);
 * });
 * audioRecord.start();
 * 录音结束后
 * audioRecord.stop();
 * 
 * 注意事项:
 * 1. pnpm install recordrtc
 * 2. pnpm i --save-dev @types/recordrtc // ts再安装依赖
 */
import RecordRTC from 'recordrtc';

export default class AudioRecord {
    private recorder: RecordRTC | null = null;
    private stream: MediaStream | null = null;

    // 用于外部监听实时音频数据
    private onDataAvailable: ((data: string) => void) | null = null;
    constructor(onwatch: ((data: string) => void)) {
        this.onDataAvailable = onwatch
    }

    // 开始录音
    async start() {
        if (!navigator.mediaDevices) {
            console.error("浏览器不支持mediaDevices.");
            return;
        }

        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // 设置录音选项
            const options: RecordRTC.Options = {
                type: 'audio', // 仅录制音频
                mimeType: 'audio/webm',
                recorderType: RecordRTC.StereoAudioRecorder, // 使用 StereoAudioRecorder
                disableLogs: true, // 禁用日志
                timeSlice: 1000, // 每 1 秒生成一个 Blob
                audioBitsPerSecond: 16, // 音频比特率
                desiredSampRate: 16000, // 目标采样率
                numberOfAudioChannels: 1, // 单声道
                // ondataavailable: async (blob: Blob) => {
                //     const base64PCM = await this.blobToBase64(blob)
                //     if (this.onDataAvailable) {
                //         this.onDataAvailable(base64PCM);
                //     }
                // },
            };

            this.recorder = new RecordRTC(this.stream, options);
            this.recorder.startRecording();
        } catch (err) {
            console.error("无法获取麦克风权限:", err);
        }
    }

    // 停止录音
    async stop() {
        if (this.recorder) {
            await new Promise<void>((resolve) => {
                this.recorder?.stopRecording(async () => {
                    const blobData = this.recorder!.getBlob();
                    const a = await this.blobToBase64(blobData)
                    // 创建 Blob 对象的 URL，用于播放
                    if (this.onDataAvailable) {
                        this.onDataAvailable(a);
                    }
                    // 关闭媒体流
                    if (this.stream) {
                        this.stream.getTracks().forEach((track) => track.stop());
                    }

                    this.recorder?.destroy();
                    this.recorder = null;
                    this.onDataAvailable = null
                    resolve();
                });
            });
        }
    }
    private blobToBase64(blob: Blob): Promise<string> {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result?.toString().split(',')[1] || '';
                resolve(base64String);
            };
            reader.readAsDataURL(blob);
        });
    }
}