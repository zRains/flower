# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

```tsx
export const BasicMenu: MenuProps['items'] = [
  {
    key: 'api-service',
    label: '调用接口',
    onClick: (menu) => {
      console.log('menu', menu)
    },
  },
  // {
  //   key: 'forward',
  //   label: '点击转跳',
  //   disabled: true,
  //   children: [
  //     {
  //       key: 'forward-forms',
  //       label: '表单',
  //     },
  //     {
  //       key: 'forward-pages',
  //       label: '页面',
  //     },
  //     {
  //       key: 'forward-link',
  //       label: '外链',
  //     },
  //     {
  //       key: 'forward-page-detail',
  //       label: '详情页面',
  //     },
  //   ],
  // },
  {
    key: 'message',
    label: '显示消息',
    // children: [
    //   {
    //     key: 'message-global',
    //     label: '全局消息',
    //   },
    //   {
    //     key: 'message-comfirm',
    //     label: '确认消息',
    //   },
    // ],
  },
]
```
