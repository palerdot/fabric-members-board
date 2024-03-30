<script>
  import { onMount, tick } from "svelte"
  import { fabric } from "fabric"
  import { chunk, forEach, defer, debounce } from "lodash-es"

  import {
    Card,
    width as card_group_width,
    height as card_group_height,
  } from "./lib/fabric/card"
  import { draw_cards, clear, redraw } from "./lib/fabric/canvas"

  let holder_elem

  let canvas_width = 500
  let canvas_height = 400

  const padding = 5
  const card_width = card_group_width + 2 * padding
  const card_height = card_group_height + 2 * padding

  const profiles = [
    {
      name: "Arun",
      handle: "@palerdot",
      url: "https://palerdot.in",
    },
    {
      name: "Kumar",
      handle: "@initdot",
      url: "https://github.com/palerdot",
    },
    {
      name: "amaidhi",
      handle: "@initdot",
      url: "https://github.com/palerdot",
    },
  ]

  // $: columns = Math.floor(canvas_width / card_width)
  // $: rows = chunk(profiles, columns)

  let canvas

  function initCanvas() {
    canvas = new fabric.Canvas("canvas", {
      width: canvas_width,
      height: canvas_height,
    })

    let boundingBox = new fabric.Rect({
      id: "bounding-box",
      width: canvas.width,
      height: canvas.height,
      hasBorders: false,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      evented: false,
      stroke: "",
      fill: "white",
      selectable: false,
    })

    canvas.add(boundingBox)

    // Event on object moving
    canvas.on("object:moving", function (e) {
      var object = e.target

      if (!object) {
        return
      }

      // check left
      if (object.left < boundingBox.left) {
        object.set("left", boundingBox.left)
      }
      // check right
      else if (
        object.left + object.width >
        boundingBox.left + boundingBox.width
      ) {
        object.set("left", boundingBox.left + boundingBox.width - object.width)
      }
      // check top
      if (object.top < boundingBox.top) {
        object.set("top", boundingBox.top)
      }
      // check bottom
      else if (
        object.top + object.height >
        boundingBox.top + boundingBox.height
      ) {
        object.set("top", boundingBox.top + boundingBox.height - object.height)
      }
    })
  }

  const stub_redraw = debounce(() => {
    if (!canvas) {
      return
    }
    console.log("porumai ... stub redraw ")
    redraw({
      canvas,
      profiles,
      width: canvas_width,
      height: canvas_height,
    })
  }, 314)

  // function draw_cards() {
  //   forEach(rows, (row_cards, row) => {
  //     forEach(row_cards, (info, column) => {
  //       const card = new Card({
  //         top: row * card_height + padding,
  //         left: column * card_width + padding,
  //         ...info,
  //       })

  //       canvas.add(card)
  //     })
  //   })
  // }

  // function clear() {
  //   canvas.clear()

  //   defer(() => {
  //     canvas.renderAll()
  //   })
  // }

  // function redraw() {
  //   clear()

  //   defer(() => {
  //     canvas.renderAll()
  //     draw_cards()
  //   })
  // }

  onMount(() => {
    const rect = holder_elem.getBoundingClientRect()
    canvas_width = rect.width
    canvas_height = rect.height
    tick().then(() => {
      initCanvas()
    })
    // observe dimension changes
    // var ro = new ResizeObserver(entries => {
    //   for (let entry of entries) {
    //     const cr = entry.contentRect

    //     console.log("Element:", entry.target, canvas)
    //     console.log(`Element size: ${cr.width}px x ${cr.height}px`)
    //     console.log(`Element padding: ${cr.top}px ; ${cr.left}px`)

    //     canvas_width = cr.width
    //     canvas_height = cr.height
    //   }
    // })

    // // Observe one or multiple elements
    // ro.observe(holder_elem)
  })

  $: {
    tick().then(() => {
      // console.log("porumai ... canvas ", canvas_width, canvas_height)
      stub_redraw()
    })
  }
</script>

<main bind:this={holder_elem}>
  <canvas id="canvas" width={canvas_width} height={canvas_height}></canvas>

  <div>
    <button
      on:click={() =>
        redraw({
          canvas,
          profiles,
          width: canvas_width,
          height: canvas_height,
        })}>Redraw</button
    >
    <button on:click={() => clear(canvas)}>Clear</button>
  </div>
</main>

<style>
  canvas {
    border: thin solid #aaf;
  }
</style>
