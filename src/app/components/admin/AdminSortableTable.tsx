'use client'

import {
  useState,
  type DragEvent,
  type ReactNode,
} from 'react'
import ui from './AdminUi.module.css'

export function reorderItems<T>(items: T[], from: number, to: number): T[] {
  if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) {
    return items
  }
  const next = [...items]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

export function DragHandle() {
  return (
    <span className={ui.dragHandle} aria-hidden="true" title="Перетащите для смены порядка">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
        <circle cx="5" cy="4" r="1.3" />
        <circle cx="11" cy="4" r="1.3" />
        <circle cx="5" cy="8" r="1.3" />
        <circle cx="11" cy="8" r="1.3" />
        <circle cx="5" cy="12" r="1.3" />
        <circle cx="11" cy="12" r="1.3" />
      </svg>
    </span>
  )
}

export function SortableTableRow({
  index,
  children,
  onReorder,
  disabled,
}: {
  index: number
  children: ReactNode
  onReorder: (from: number, to: number) => void
  disabled?: boolean
}) {
  const [dragging, setDragging] = useState(false)
  const [over, setOver] = useState(false)

  function onDragStart(event: DragEvent<HTMLTableRowElement>) {
    if (disabled) return
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', String(index))
    setDragging(true)
  }

  function onDragOver(event: DragEvent<HTMLTableRowElement>) {
    if (disabled) return
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    setOver(true)
  }

  function onDragLeave() {
    setOver(false)
  }

  function onDrop(event: DragEvent<HTMLTableRowElement>) {
    if (disabled) return
    event.preventDefault()
    const from = Number(event.dataTransfer.getData('text/plain'))
    setOver(false)
    setDragging(false)
    if (!Number.isFinite(from)) return
    onReorder(from, index)
  }

  function onDragEnd() {
    setDragging(false)
    setOver(false)
  }

  return (
    <tr
      className={[
        ui.sortableRow,
        dragging ? ui.sortableRowDragging : '',
        over ? ui.sortableRowOver : '',
      ]
        .filter(Boolean)
        .join(' ')}
      draggable={!disabled}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      {children}
    </tr>
  )
}
