<template>
    <div class="verify-container w-full h-full">
        <canvas ref="imageVerify" @click="handleDraw" class="verify-canvas w-full h-full"></canvas>
    </div>
</template>

<script setup lang="ts">
import { randomColor, randomNum } from '@/tools';
import { ref, onMounted } from 'vue';

const imageVerify = ref<HTMLCanvasElement | null>(null);
const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
const imgCode = ref<string>('');

const handleDraw = () => {
    imgCode.value = draw();
};

const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = randomColor(180, 230);
    ctx.fillRect(0, 0, width, height);
};

const drawText = (ctx: CanvasRenderingContext2D, width: number) => {
    let imgCode = "";
    for (let i = 0; i < 4; i++) {
        const text = pool[randomNum(0, pool.length - 1)];
        const fontSize = randomNum(18, 40);
        const deg = randomNum(-30, 30);
        ctx.font = `${fontSize}px Simhei`;
        ctx.textBaseline = "top";
        ctx.fillStyle = randomColor(80, 150);
        ctx.save();
        ctx.translate((width / 4) * i + 15, 15);
        ctx.rotate((deg * Math.PI) / 180);
        ctx.fillText(text, -15 + 5, -15);
        ctx.restore();
        imgCode += text;
    }
    return imgCode;
};

const drawLines = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(randomNum(0, width), randomNum(0, height));
        ctx.lineTo(randomNum(0, width), randomNum(0, height));
        ctx.strokeStyle = randomColor(180, 230);
        ctx.closePath();
        ctx.stroke();
    }
};

const drawDots = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = randomColor(150, 200);
        ctx.fill();
    }
};

const draw = (): string => {
    if (!imageVerify.value) return '';
    const ctx = imageVerify.value.getContext("2d");
    if (!ctx) return '';

    const width = imageVerify.value.clientWidth;
    const height = imageVerify.value.clientHeight;

    // 显式设置 canvas 的 width 和 height 属性
    imageVerify.value.width = width;
    imageVerify.value.height = height;

    drawBackground(ctx, width, height);
    const imgCode = drawText(ctx, width);
    drawLines(ctx, width, height);
    drawDots(ctx, width, height);

    return imgCode;
};

const isCodeValid = (input: string) => {
    const iscode = input.toUpperCase() === imgCode.value.toUpperCase();
    if (!iscode && imageVerify.value) handleDraw();
    return iscode;
};

onMounted(() => {
    if (imageVerify.value) {
        imgCode.value = draw();
    }
});

defineExpose({
    isCodeValid,
});
</script>

<style scoped lang="scss">
.verify-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;

    .verify-canvas {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        border-radius: 8px;
        cursor: pointer;
    }
}
</style>