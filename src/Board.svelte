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

  export let profiles

  let holder_elem

  let canvas_width = 500
  let canvas_height = 400

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

  //
  const canvas_redraw = debounce(
    ({ canvas, profiles, canvas_width, canvas_height }) => {
      if (!canvas) {
        return
      }

      redraw({
        canvas,
        profiles,
        width: canvas_width,
        height: canvas_height,
      })
    },
    314
  )

  onMount(() => {
    const rect = holder_elem.getBoundingClientRect()
    canvas_width = rect.width
    canvas_height = rect.height

    tick().then(() => {
      initCanvas()
    })
  })

  $: {
    tick().then(() => {
      canvas_redraw({
        canvas,
        profiles,
        canvas_width,
        canvas_height,
      })
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
  main {
    width: 100%;
    height: 100%;
  }

  canvas {
    border: thin solid #94a3b8;
    border-radius: 5px;
  }

  button {
    padding: 4px 8px;
    margin: 4px;

    background: #475569;
    border-radius: 5px;
    border: thin solid #64748b;
  }

  button:hover {
    cursor: pointer;
    background: #64748b;
  }
</style>
