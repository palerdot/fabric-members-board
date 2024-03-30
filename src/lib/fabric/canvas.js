import { fabric } from "fabric"
import { chunk, defer, forEach } from "lodash-es"
import {
  Card,
  width as card_group_width,
  height as card_group_height,
} from "./card"

const padding = 5
const card_width = card_group_width + 2 * padding
const card_height = card_group_height + 2 * padding

export function draw_cards({ canvas, profiles }) {
  const columns = Math.floor(canvas.width / card_width)
  const rows = chunk(profiles, columns)

  forEach(rows, (row_cards, row) => {
    forEach(row_cards, (info, column) => {
      const card = new Card({
        top: row * card_height + padding,
        left: column * card_width + padding,
        ...info,
      })

      canvas.add(card)
    })
  })
}

export function clear(canvas) {
  canvas.clear()

  defer(() => {
    canvas.renderAll()
  })
}

export function redraw({ canvas, profiles, width, height }) {
  clear(canvas)

  if (canvas.width !== width || canvas.height !== height) {
    canvas.setDimensions({
      width,
      height,
    })
  }

  defer(() => {
    canvas.renderAll()
    draw_cards({ canvas, profiles })
  })
}
