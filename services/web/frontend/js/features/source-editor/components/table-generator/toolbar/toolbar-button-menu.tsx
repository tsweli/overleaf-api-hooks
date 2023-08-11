import { FC, memo, useRef } from 'react'
import useDropdown from '../../../../../shared/hooks/use-dropdown'
import { Button, ListGroup, Overlay, Popover } from 'react-bootstrap'
import Tooltip from '../../../../../shared/components/tooltip'
import MaterialIcon from '../../../../../shared/components/material-icon'
import { useCodeMirrorViewContext } from '../../codemirror-editor'

export const ToolbarButtonMenu: FC<{
  id: string
  label: string
  icon: string
  disabled?: boolean
}> = memo(function ButtonMenu({ icon, id, label, children, disabled }) {
  const target = useRef<any>(null)
  const { open, onToggle, ref } = useDropdown()
  const view = useCodeMirrorViewContext()

  const button = (
    <Button
      type="button"
      className="table-generator-toolbar-button table-generator-toolbar-button-menu"
      aria-label={label}
      bsStyle={null}
      onMouseDown={event => {
        event.preventDefault()
        event.stopPropagation()
      }}
      onClick={event => {
        onToggle(!open)
      }}
      disabled={disabled}
      ref={target}
    >
      <MaterialIcon type={icon} />
      <MaterialIcon type="expand_more" />
    </Button>
  )

  const overlay = (
    <Overlay
      show={open}
      target={target.current}
      placement="bottom"
      container={view.dom}
      containerPadding={0}
      animation
      onHide={() => onToggle(false)}
    >
      <Popover
        id={`${id}-menu`}
        ref={ref}
        className="table-generator-button-menu-popover"
      >
        <ListGroup
          role="menu"
          onClick={() => {
            onToggle(false)
          }}
        >
          {children}
        </ListGroup>
      </Popover>
    </Overlay>
  )

  if (!label) {
    return (
      <>
        {button}
        {overlay}
      </>
    )
  }

  return (
    <>
      <Tooltip
        hidden={open}
        id={id}
        description={<div>{label}</div>}
        overlayProps={{ placement: 'bottom' }}
      >
        {button}
      </Tooltip>
      {overlay}
    </>
  )
})