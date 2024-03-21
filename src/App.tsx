import { ConfigProvider } from 'antd'
import FlowerContainer from './core'
import Index from './core/panels/widgets/conditionEditor/index.tsx'
import SourceSelector from './core/panels/widgets/sourceSelector/index.tsx'

export default function App() {
  return (
    <>
      <ConfigProvider prefixCls="ant">
        <FlowerContainer />
        {/* <Index /> */}
        {/* <SourceSelector /> */}
      </ConfigProvider>
    </>
  )
}
