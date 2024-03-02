import type { MenuProps } from 'antd'

export const BasicMenu: MenuProps['items'] = [
  {
    key: 'api-service',
    label: '调用接口',
    onClick: (menu) => {
      console.log('menu', menu)
    },
  },
  {
    key: 'message',
    label: '显示消息',
  },
]
