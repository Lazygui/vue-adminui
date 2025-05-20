<template>
    <span v-for="(segment, index) in parsedSegments" :key="index" :style="segment.style">
        {{ segment.text }}
    </span>
</template>
<script lang="ts" setup>
const props = defineProps<{
    code: string
}>()
const BASE_COLOR = "oklch(92% .004 286.32)";

const getMixedColor = (hue: number) =>
    `color-mix(in oklab, 
    color-mix(in oklab, white 40%, ${BASE_COLOR}) 20%,
    oklch(75% .3 ${hue})
  )`;

const COLOR_MAP = {
    tagName: "white",
    attrName: getMixedColor(337.94),
    attrValue: getMixedColor(173.24),
    text: getMixedColor(242.69)
};
// 匹配开始标签（含属性部分）
const startTagRegex = /^<([^\s>]+)(.*?)>/
// 匹配结束标签
const endTagRegex = /<\/([^\s>]+)>$/
// 匹配标签属性（支持带引号和不带引号）
const attrRegex = /([^\s=]+)(?:=(["'])(.*?)\2)?/g
const parseStartTag = (tagStr: string) => {
    const segments = [];
    const [_, tagName, attrs] = tagStr.match(startTagRegex) || [];
    segments.push({
        text: `<${tagName}`,
        style: `color: ${COLOR_MAP.tagName}`
    });
    let attrMatch;
    while ((attrMatch = attrRegex.exec(attrs)) !== null) {
        const [_, name, quote, value] = attrMatch;
        segments.push({
            text: ` ${name}`,
            style: `color: ${COLOR_MAP.attrName}`
        });
        if (value) {
            segments.push(
                { text: "=", style: `color: ${COLOR_MAP.tagName}` },
                { text: `${quote}${value}${quote}`, style: `color: ${COLOR_MAP.attrValue}` }
            );
        }
    }

    segments.push({ text: ">", style: `color: ${COLOR_MAP.tagName}` });
    return segments;
};

const parsedSegments = computed(() => {
    try {
        const startMatch = props.code.match(startTagRegex);
        const endMatch = props.code.match(endTagRegex);
        if (!startMatch || !endMatch) throw new Error();

        const [startFull, tagName, attrs] = startMatch;
        const content = props.code
            .slice(startFull.length, -endMatch[0].length);

        return [
            ...parseStartTag(`<${tagName}${attrs}>`),
            { text: content, style: `color: ${COLOR_MAP.text}` },
            { text: endMatch[0], style: `color: ${COLOR_MAP.tagName}` }
        ];
    } catch {
        return [{
            text: props.code,
            style: `color: ${COLOR_MAP.text}; opacity: 0.6`
        }];
    }
});
</script>