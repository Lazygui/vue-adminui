<template>
       <div class="theme-button flex items-center">
              <label class="toggle text-base-content">
                     <input type="checkbox" value="dark" @change="handleThemeChange" :checked="theme === 'dark'" />
                     <SunIcon aria-label="sun"></SunIcon>
                     <MoonIcon aria-label="moon"></MoonIcon>
              </label>
       </div>
</template>

<script setup lang="ts">
type ITheme = 'dark' | 'light'
const emit = defineEmits<{
       (e: 'update:modelValue', el: ITheme): void,
}>()
const theme = ref<ITheme>('light')
const handleThemeChange = (e: Event) => {
       const target = e.target as HTMLInputElement
       const theme = target.checked ? 'dark' : 'light'
       document.documentElement.setAttribute('data-theme', theme)
       storage.setItem(StorageKeys.THEME, theme)
       emit('update:modelValue', theme)
}
onMounted(() => {
       const themeloacl = storage.getItem(StorageKeys.THEME) as ITheme
       if (themeloacl) {
              theme.value = themeloacl
              return
       }
       const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
       theme.value = prefersDark ? 'dark' : 'light'
})
</script>

<style scoped lang="scss">
.theme-button {
       gap: 0.5rem;

       .toggle {
              border: var(--border) solid currentColor;
              position: relative;
              display: inline-grid;
              flex-shrink: 0;
              cursor: pointer;
              appearance: none;
              place-content: center;
              vertical-align: middle;
              user-select: none;
              grid-template-columns: 0fr 1fr 1fr;
              --radius-selector-max: calc(var(--radius-selector) + var(--radius-selector) + var(--radius-selector));
              border-radius: calc(var(--radius-selector) + min(var(--toggle-p), var(--radius-selector-max)) + min(var(--border), var(--radius-selector-max)));
              padding: var(--toggle-p);
              box-shadow: 0 1px color-mix(in oklab, currentColor calc(var(--depth) * 10%), #0000) inset;
              transition: color 0.3s, grid-template-columns 0.2s;
              --input-color: color-mix(in oklab, var(--color-base-content) 50%, #0000);
              --toggle-p: 0.1875rem;
              --size: calc(var(--size-selector, 0.25rem) * 6);
              width: calc((var(--size) * 2) - (var(--border) + var(--toggle-p)) * 2);
              height: fit-content;

              >* {
                     z-index: 1;
                     grid-column: span 1 / span 1;
                     grid-column-start: 2;
                     grid-row-start: 1;
                     height: 100%;
                     cursor: pointer;
                     appearance: none;
                     background-color: transparent;
                     padding: calc(0.25rem * 0.5);
                     box-sizing: border-box;
                     transition: opacity 0.2s, rotate 0.4s;
                     border: none;

                     &:focus {
                            --tw-outline-style: none;
                            outline-style: none;

                            @media (forced-colors: active) {
                                   outline: 2px solid transparent;
                                   outline-offset: 2px;
                            }
                     }

                     &:nth-child(2) {
                            color: var(--color-base-100)
                                   /* var(--color-base-100) */
                            ;
                            rotate: 0deg;
                     }

                     &:nth-child(3) {
                            color: var(--color-base-100)
                                   /* var(--color-base-100) */
                            ;
                            opacity: 0%;
                            rotate: -15deg;
                     }
              }

              &:has(:checked) {
                     > :nth-child(2) {
                            opacity: 0%;
                            rotate: 15deg;
                     }

                     > :nth-child(3) {
                            opacity: 100%;
                            rotate: 0deg;
                     }
              }

              &:before {
                     position: relative;
                     inset-inline-start: calc(0.25rem
                                   /* 4px */
                                   * 0)
                            /* 0rem = 0px */
                     ;
                     grid-column-start: 2;
                     grid-row-start: 1;
                     aspect-ratio: 1 / 1;
                     height: 100%;
                     border-radius: var(--radius-selector)
                            /* var(--radius-selector) */
                     ;
                     background-color: currentColor;
                     translate: 0;
                     --tw-content: "";
                     content: var(--tw-content);
                     transition: background-color 0.1s, translate 0.2s, inset-inline-start 0.2s;
                     box-shadow: 0 -1px oklch(0% 0 0 / calc(var(--depth) * 0.1))
                            /* #000000 */
                            inset, 0 8px 0 -4px oklch(100% 0 0 / calc(var(--depth) * 0.1)) inset, 0 1px color-mix(in oklab, currentColor calc(var(--depth) * 10%), #0000);
                     background-size: auto, calc(var(--noise) * 100%);
                     background-image: none, var(--fx-noise);
              }

              @media (forced-colors: active) {
                     &:before {
                            outline-style: var(--tw-outline-style);
                            outline-width: 1px;
                            outline-offset: calc(1px * -1)
                                   /* -1px */
                            ;
                     }
              }

              @media print {
                     &:before {
                            outline: 0.25rem
                                   /* 4px */
                                   solid;
                            outline-offset: -1rem
                                   /* -16px */
                            ;
                     }
              }

              &:focus-visible,
              &:has(:focus-visible) {
                     outline: 2px solid currentColor;
                     outline-offset: 2px;
              }

              &:checked,
              &[aria-checked="true"],
              &:has(> input:checked) {
                     grid-template-columns: 1fr 1fr 0fr;
                     background-color: var(--color-base-100)
                            /* var(--color-base-100) */
                     ;
                     --input-color: var(--color-base-content)
                            /* var(--color-base-content) */
                     ;

                     &:before {
                            background-color: currentColor;
                     }

                     @starting-style {
                            &:before {
                                   opacity: 0;
                            }
                     }
              }

              &:indeterminate {
                     grid-template-columns: 0.5fr 1fr 0.5fr;
              }

              &:disabled {
                     cursor: not-allowed;
                     opacity: 30%;

                     &:before {
                            background-color: transparent;
                            border: var(--border) solid currentColor;
                     }
              }
       }
}
</style>