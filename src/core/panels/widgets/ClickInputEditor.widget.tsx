import { Input, Typography } from 'antd'
import { useState } from 'react'
import { EditIcon } from '../../svgIcons'
import themeStyle from '../../theme.module.less'
import style from './clickInputEditor.widget.module.less'

interface ClickInputEditorWidgetProps {
  value?: string
  onChange?: (value: string) => void
}

export default function ClickInputEditorWidget(props: ClickInputEditorWidgetProps) {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <div className={style['click-input-editor-widget-wrapper']}>
      {isEditing ? (
        <Input
          className={themeStyle['flower-input']}
          size="small"
          value={props.value}
          onChange={(event) => props.onChange?.(event.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : (
        <Typography.Text
          ellipsis={{
            tooltip: { title: props.value, overlayClassName: style['ellipsis-tooltip-overlay'] },
          }}
        >
          {props.value}
        </Typography.Text>
      )}
      {!isEditing && (
        <span className="params-widget-name-edit-btn" onClick={() => setIsEditing(true)}>
          <EditIcon />
        </span>
      )}
    </div>
  )
}
