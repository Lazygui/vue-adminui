/// <reference types="vite/client" />
declare module '*.vue' {
       import { Component } from 'vue'; const component: Component; export default component;
}
declare module '@svg' {
       import { DefineComponent } from 'vue';
       const component: DefineComponent<{}, {}, any>;
       export default component;
}
