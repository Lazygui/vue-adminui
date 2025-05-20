<template>
    <span v-for="(segment, index) in parsedSegments" :key="index" :style="segment.style">
        {{ segment.text }}
    </span>
</template>
<script lang="ts" setup>
const props = defineProps<{
    code: string
}>()
const COLOR_MAP = {
    tagName: 'white',
    attrName: 'color-mix(in oklab,color-mix(in oklab,white 40%, oklch(92% .004 286.32))20%,oklch(75% .3 337.94))',
    attrValue: 'color-mix(in oklab,color-mix(in oklab,white 40%, oklch(92% .004 286.32))20%,oklch(75% .3 173.24))',
    text: 'color-mix(in oklab,color-mix(in oklab,white 40%, oklch(92% .004 286.32))20%,oklch(75% .3 242.69))'
};

const parsedSegments = computed(() => {
    const segments: Array<{ text: string; style: string }> = [];
    const startTagMatch = props.code.match(/^<[^>]+>/);
    const endTagMatch = props.code.match(/<\/[^>]+>$/);
    if (!startTagMatch || !endTagMatch) {
        throw new Error("Invalid template string");
    }
    const startTags = startTagMatch[0];
    const endTag = endTagMatch[0];
    const content = props.code.slice(startTags.length, -endTag.length);
    if (startTags && startTags.length > 0) {
        const startTag = startTags.replace(/^<|>$/g, '').split(' ')
        segments.push({
            text: `<${startTag[0]}`,
            style: `color: ${COLOR_MAP.tagName}`
        })
        for (let i = 1; i < startTag.length; i++) {
            const attr = startTag[i]
            if (attr.includes("=")) {
                const [attrName, attrValue] = attr.split("=")
                segments.push({
                    text: ` ${attrName}"`,
                    style: `color: ${COLOR_MAP.attrName}`
                })
                segments.push({
                    text: `=`,
                    style: `color: ${COLOR_MAP.tagName}`
                })
                segments.push({
                    text: `${attrValue}`,
                    style: `color: ${COLOR_MAP.attrValue}`
                })
            } else {
                segments.push({
                    text: ` ${attr}`,
                    style: `color: ${COLOR_MAP.attrName}`
                })
            }
        }
        segments.push({
            text: `>`,
            style: `color: ${COLOR_MAP.tagName}`
        })
    }
    if (content && content.length > 0) {
        segments.push({
            text: `${content}`,
            style: `color: ${COLOR_MAP.text}`
        })
    }
    if (endTag && endTag.length > 0) {
        segments.push({
            text: `${endTag}`,
            style: `color: ${COLOR_MAP.tagName}`
        })
    }
    return segments;
});
</script>