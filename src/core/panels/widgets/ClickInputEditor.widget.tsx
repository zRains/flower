import { Input, Typography } from 'antd'
import style from './clickInputEditor.widget.module.less'
import { useState } from 'react'

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
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M20.952 3.048a3.578 3.578 0 0 0-5.06 0L3.94 15a3.106 3.106 0 0 0-.825 1.476L2.02 21.078a.75.75 0 0 0 .904.903l4.601-1.096a3.106 3.106 0 0 0 1.477-.825l11.95-11.95a3.578 3.578 0 0 0 0-5.06m-4 1.06a2.078 2.078 0 1 1 2.94 2.94L19 7.939L16.06 5zM15 6.062L17.94 9l-10 10c-.21.21-.474.357-.763.426l-3.416.814l.813-3.416c.069-.29.217-.554.427-.764z"
            />
          </svg>
        </span>
      )}
    </div>
  )
}
