<template>
    <div>
        <span v-for="(segment, index) in parsedSegments" :key="index" :style="{ color: segment.color }">
            {{ segment.text }}
        </span>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

export interface Segments {
    row: string,
    rowStyle: {
        white: string[],
        text: string[],
        propertyNmae: string[],
        propertyValue: string[]
    }
}

const props = defineProps<{
    code: Segments
}>();

const COLOR_MAP = {
    tagName: 'white',
    propertyNmae: 'color-mix(in oklab,color-mix(in oklab,white 40%, oklch(92% .004 286.32))20%,oklch(75% .3 337.94))',
    propertyValue: 'color-mix(in oklab,color-mix(in oklab,white 40%, oklch(92% .004 286.32))20%,oklch(75% .3 173.24))',
    text: 'color-mix(in oklab,color-mix(in oklab,white 40%, oklch(92% .004 286.32))20%,oklch(75% .3 242.69))'
};

const parsedSegments = computed(() => {
    try {

        const { row, rowStyle } = props.code;
        const segments: { text: string, color: string }[] = [];

        const lines = row.split('\n');
        lines.forEach((line, lineIndex) => {
            if (lineIndex > 0) {
                segments.push({ text: '\n', color: COLOR_MAP.text });
            }

            let remainingLine = line;
            while (remainingLine.length > 0) {
                const whiteMatch = rowStyle.white.find(white => remainingLine.startsWith(white));
                if (whiteMatch) {
                    segments.push({ text: whiteMatch, color: COLOR_MAP.tagName });
                    remainingLine = remainingLine.slice(whiteMatch.length);
                    continue;
                }

                const textMatch = rowStyle.text.find(text => remainingLine.startsWith(text));
                if (textMatch) {
                    segments.push({ text: textMatch, color: COLOR_MAP.text });
                    remainingLine = remainingLine.slice(textMatch.length);
                    continue;
                }

                const propertyNameMatch = rowStyle.propertyNmae.find(prop => remainingLine.startsWith(prop));
                if (propertyNameMatch) {
                    segments.push({ text: propertyNameMatch, color: COLOR_MAP.propertyNmae });
                    remainingLine = remainingLine.slice(propertyNameMatch.length);
                    continue;
                }

                const propertyValueMatch = rowStyle.propertyValue.find(value => remainingLine.startsWith(value));
                if (propertyValueMatch) {
                    segments.push({ text: propertyValueMatch, color: COLOR_MAP.propertyValue });
                    remainingLine = remainingLine.slice(propertyValueMatch.length);
                    continue;
                }

                segments.push({ text: remainingLine[0], color: COLOR_MAP.text });
                remainingLine = remainingLine.slice(1);
            }
        });

        return segments;
    } catch (e) {
        return [{
            text: props.code,
            color: `color: ${COLOR_MAP.text}; opacity: 0.6`
        }];
    }
});
</script>

<style scoped>
div {
    white-space: pre-wrap;
}
</style>