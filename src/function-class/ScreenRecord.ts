/**
 * 屏幕录制类
 * 
 * 该类用于实现屏幕录制功能，包括开始录制、停止录制、下载录制文件等操作。
 * 使用 MediaRecorder API 进行屏幕录制，并将录制的视频显示在指定的 HTMLVideoElement 中。
 * 
 * 作者: zhouzhijun
 * 
 * 功能说明:
 * 1. 通过 `play()` 方法开始屏幕录制，并实时预览录制的视频。
 * 2. 通过 `stop()` 方法停止录制，并生成录制的视频文件。
 * 3. 通过 `download()` 方法下载录制的视频文件。
 * 4. 通过 `getUrl()` 方法获取录制视频的 URL。
 * 
 * 注意事项:
 * 1. 在调用 `play()` 方法之前，确保页面中已经存在指定的 video 元素。
 * 2. 在调用 `stop()` 方法之后，录制的视频文件会自动下载。
 * 3. 录制的视频文件格式为 webm。
 */
export default class ScreenRecord {
    private videoPreview: HTMLVideoElement;
    private mediaRecorder: MediaRecorder | null = null;
    private recordedChunks: Blob[] = [];
    private recordedBlob: Blob | null = null;
    private recordedBlobUrl: string | null = null;
    public isRecording = false;
    public recordingTime = 0;
    private intervalId: number | null = null;

    constructor(videoId: string) {
        const videoElement = document.getElementById(videoId);
        if (!(videoElement instanceof HTMLVideoElement)) {
            throw new Error(`Element with id ${videoId} is not a video element.`);
        }
        this.videoPreview = videoElement;
    }

    public async play() {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true,
            });

            this.setupVideoPreview(stream);
            this.setupMediaRecorder(stream);

            this.mediaRecorder?.start();
            this.isRecording = true;
            this.startRecordingTimer();
        } catch (error) {
            throw new Error(`Failed to start recording: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    public stop() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;
            this.stopMediaStream();
            this.clearRecordingTimer();
        }
    }

    public download() {
        if (this.recordedBlobUrl) {
            this.downloadFile(this.recordedBlobUrl, "recording.webm");
            URL.revokeObjectURL(this.recordedBlobUrl);
            this.recordedBlobUrl = null;
        }
    }

    public getUrl() {
        return this.recordedBlobUrl;
    }

    private setupVideoPreview(stream: MediaStream) {
        if (this.videoPreview) {
            this.videoPreview.srcObject = stream;
        }
    }

    private setupMediaRecorder(stream: MediaStream) {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                this.recordedChunks.push(event.data);
            }
        };
        this.mediaRecorder.onstop = () => {
            this.recordedBlob = new Blob(this.recordedChunks, { type: "video/webm" });
            this.recordedBlobUrl = URL.createObjectURL(this.recordedBlob);
            this.recordedChunks = [];
            this.clearRecordingTimer();
            this.recordingTime = 0;
            this.download();
        };
    }

    private startRecordingTimer() {
        this.intervalId = setInterval(() => {
            this.recordingTime += 1;
        }, 1000);
    }

    private clearRecordingTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    private stopMediaStream() {
        if (this.videoPreview.srcObject) {
            const stream = this.videoPreview.srcObject as MediaStream;
            stream.getTracks().forEach((track) => track.stop());
        }
    }

    private downloadFile(url: string, filename: string) {
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
    }
}