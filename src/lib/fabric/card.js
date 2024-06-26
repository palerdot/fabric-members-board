import { fabric } from "fabric"

export const width = 200
export const height = 50

export const Card = fabric.util.createClass(fabric.Group, {
  type: "Card",

  initialize: function (options) {
    const border = new fabric.Rect({
      top: -150,
      left: -100,
      width,
      height,
      stroke: "#CBD5E1",
      fill: "#F8FAFC",
    })

    const avatar = new fabric.Rect({
      top: -150,
      left: -100,
      width: 50,
      height: 50,
      fill: "transparent",
    })

    const name = new fabric.Text(options.name || "hello world", {
      fontSize: 18,
      top: -140,
      left: -40,
    })

    this.callSuper("initialize", [border, avatar, name], {
      top: options.top,
      left: options.left,
      width: 200,
      height: 50,
      hasBorders: true,
      subTargetCheck: true,
      fill: "#F8FAFC",
    })

    this.on("mouseover", function (e) {
      this.item(0).set("stroke", "#475569")
      this.item(0).set("fill", "#EEF2FF")
      if (e.target) {
        e.target.canvas.renderAll()
      }
    })

    this.on("mouseout", function (e) {
      this.item(0).set("stroke", "#CBD5E1")
      this.item(0).set("fill", "#F8FAFC")
      if (e.target) {
        e.target.canvas.renderAll()
      }
    })

    this.on("mousedblclick", e => {
      window.open(options.url || "https://palerdot.in")
    })

    // load image after it is loaded
    fabric.Image.fromURL(
      options.image_url || "https://avatars.githubusercontent.com/u/102812?v=4",
      img => {
        const img_avatar = img.scale(0.1).set({
          top: -25,
          left: -100,
        })

        // add image to group
        this.add(img_avatar)
        // refresh and render
        if (this.canvas) {
          this.canvas.renderAll()
        }
      }
    )
  },
})
