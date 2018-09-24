/**
 * Coneción entre cocada y openjscad
 */

var Processor = require("@jscad/openjscad/src/jscad/processor.js")
const {
  formats,
  supportedFormatsForObjects
} = require("@jscad/openjscad/src/io/formats")

const Viewer = require("@jscad/openjscad/src/ui/viewer/jscad-viewer")

/**
 * Sobre-escribo el constructor.
 * Es una copia de la función original con los ajustes visuales de cocada
 * Ademá evita la llamada create_element que se usa en openjscad web.
 */
var original_prototype = Processor.prototype
Processor = function(containerdiv, options) {
  if (options === undefined) options = {}
  // the default options
  this.opts = {
    debug: true,
    libraries: [],
    openJsCadPath: "",
    useAsync: true,
    useSync: true,
    viewer: {
      camera: {
        fov: 45, // field of view
        angle: {
          x: -60,
          y: 0,
          z: -45
        }, // view angle about XYZ axis
        position: {
          x: 0,
          y: 0,
          z: 100
        }, // initial position at XYZ
        clip: {
          min: 0.5,
          max: 1000 // rendering outside this range is clipped
        }
      },
      plate: {
        draw: true, // draw or not
        size: 200, // plate size (X and Y)
        // minor grid settings
        m: {
          i: 10, // number of units between minor grid lines
          color: {
            r: 0.8,
            g: 0.8,
            b: 0.8,
            a: 0.5 // color
          }
        },
        // major grid settings
        M: {
          i: 100, // number of units between major grid lines
          color: {
            r: 0.5,
            g: 0.5,
            b: 0.5,
            a: 0.5 // color
          }
        }
      },
      axis: {
        draw: true, // draw or not
        x: {
          neg: {
            r: 1.0,
            g: 0.5,
            b: 0.5,
            a: 0.8
          }, // color in negative direction
          pos: {
            r: 1.0,
            g: 0,
            b: 0,
            a: 1 // color in positive direction
          }
        },
        y: {
          neg: {
            r: 0.5,
            g: 1.0,
            b: 0.5,
            a: 0.8
          }, // color in negative direction
          pos: {
            r: 0,
            g: 1.0,
            b: 0,
            a: 1 // color in positive direction
          }
        },
        z: {
          neg: {
            r: 0.5,
            g: 0.5,
            b: 1.0,
            a: 0.8
          }, // color in negative direction
          pos: {
            r: 0,
            g: 0,
            b: 1.0,
            a: 1 // color in positive direction
          }
        }
      },
      solid: {
        faceColor: {
          r: 0.0,
          g: 0.4,
          b: 1.0,
          a: 1.0
        }, // default face color
        outlineColor: {
          r: 0.0,
          g: 0.0,
          b: 0.0,
          a: 0.1
        } // default outline color
      },
      background: {
        color: {
          r: 0.93,
          g: 0.93,
          b: 0.93,
          a: 1.0
        }
      }
    }
  }
  // apply all options found
  for (var x in this.opts) {
    if (x in options) this.opts[x] = options[x]
  }

  this.containerdiv = containerdiv

  this.viewer = null
  this.builder = null
  this.zoomControl = null

  // callbacks
  this.onchange = null // function(Processor) for callback
  this.ondownload = null // function(Processor) for callback

  // Marcos: watch change instnt update. (note, onchange exec on any parameter change, but not in checkbox change)
  this.instantUpdate_onChange = null // function.

  this.currentObjects = [] // list of objects returned from rebuildObject*
  this.viewedObject = null // the object being rendered

  this.selectStartPoint = 0
  this.selectEndPoint = 0

  this.hasOutputFile = false
  this.hasError = false
  this.paramDefinitions = []
  this.paramControls = []
  this.script = null
  this.formats = formats

  this.baseurl = document.location.href
  this.baseurl = this.baseurl.replace(/#.*$/, "") // remove remote URL
  this.baseurl = this.baseurl.replace(/\?.*$/, "") // remove parameters
  if (this.baseurl.lastIndexOf("/") !== this.baseurl.length - 1) {
    this.baseurl = this.baseurl.substring(0, this.baseurl.lastIndexOf("/") + 1)
  }

  // state of the processor
  // 0 - initialized - no viewer, no parameters, etc
  // 1 - processing  - processing JSCAD script
  // 2 - complete    - completed processing
  // 3 - incomplete  - incompleted due to errors in processing
  this.state = 0 // initialized

  // FIXME: UI only, seperate
  //this.createElements()
}

Processor.prototype = original_prototype
// End override contructor.

// BUG no existe el select de formato.
Processor.prototype.selectedFormat = function() {
  // return this.formatDropdown.options[this.formatDropdown.selectedIndex].value // Marcos indice no encontrado, no renderiza!!
  return "stla" /* marcos: return always STL ascii TODO FIX */
}

Processor.prototype.createElements = function() {
  var that = this // for event handlers

  while (this.containerdiv.children.length > 0) {
    this.containerdiv.removeChild(0)
  }

  var viewerdiv = document.createElement("div")
  viewerdiv.className = "viewer"
  viewerdiv.style.width = "100%"
  viewerdiv.style.height = "100%"
  this.containerdiv.appendChild(viewerdiv)
  try {
    this.viewer = new Viewer(viewerdiv, this.opts.viewer)
  } catch (e) {
    viewerdiv.innerHTML =
      "<b><br><br>Error: " +
      e.toString() +
      "</b><br><br>A browser with support for WebGL is required"
  }

  this.selectdiv = this.containerdiv.parentElement.querySelector(
    "div#selectdiv"
  )
  if (!this.selectdiv) {
    this.selectdiv = document.createElement("div")
    this.selectdiv.id = "selectdiv"
    this.containerdiv.parentElement.appendChild(this.selectdiv)
  }
  var element = document.createElement("input")
  element.setAttribute("type", "range")
  element.id = "startRange"
  element.min = 0
  element.max = 100
  element.step = 1
  element.oninput = function(e) {
    if (that.state === 2) {
      that.updateView()
      that.updateFormatsDropdown()
      that.updateDownloadLink()
    }
  }
  this.selectdiv.appendChild(element)
  element = document.createElement("input")
  element.setAttribute("type", "range")
  element.id = "endRange"
  element.min = 0
  element.max = 100
  element.step = 1
  element.oninput = function(e) {
    if (that.state === 2) {
      that.updateView()
      that.updateFormatsDropdown()
      that.updateDownloadLink()
    }
  }
  this.selectdiv.appendChild(element)

  this.errordiv = this.containerdiv.parentElement.querySelector("div#errordiv")
  if (!this.errordiv) {
    this.errordiv = document.createElement("div")
    this.errordiv.id = "errordiv"
    this.containerdiv.parentElement.appendChild(this.errordiv)
  }
  this.errorpre = document.createElement("pre")
  this.errordiv.appendChild(this.errorpre)

  this.statusdiv = this.containerdiv.parentElement.querySelector(
    "div#statusdiv"
  )
  if (!this.statusdiv) {
    this.statusdiv = document.createElement("div")
    this.statusdiv.id = "statusdiv"
    this.containerdiv.parentElement.appendChild(this.statusdiv)
  }
  this.statusspan = document.createElement("span")
  this.statusspan.id = "statusspan"
  this.statusbuttons = document.createElement("span")
  this.statusbuttons.id = "statusbuttons"
  this.statusdiv.appendChild(this.statusspan)
  this.statusdiv.appendChild(this.statusbuttons)
  this.abortbutton = document.createElement("button")
  this.abortbutton.innerHTML = "Abort"
  this.abortbutton.onclick = function(e) {
    that.abort()
  }
  this.statusbuttons.appendChild(this.abortbutton)
  this.formatDropdown = document.createElement("select")
  this.formatDropdown.onchange = function(e) {
    that.currentFormat =
      that.formatDropdown.options[that.formatDropdown.selectedIndex].value //Marcos
    that.updateDownloadLink()
  }
  this.statusbuttons.appendChild(this.formatDropdown)
  this.generateOutputFileButton = document.createElement("button")
  this.generateOutputFileButton.onclick = function(e) {
    that.generateOutputFile()
  }
  this.statusbuttons.appendChild(this.generateOutputFileButton)
  this.downloadOutputFileLink = document.createElement("a")
  this.downloadOutputFileLink.className = "downloadOutputFileLink" // so we can css it
  this.statusbuttons.appendChild(this.downloadOutputFileLink)

  this.parametersdiv = this.containerdiv.parentElement.querySelector(
    "div#parametersdiv"
  )
  if (!this.parametersdiv) {
    this.parametersdiv = document.createElement("div")
    this.parametersdiv.id = "parametersdiv"
    this.containerdiv.parentElement.appendChild(this.parametersdiv)
  }
  this.parameterstable = document.createElement("table")
  this.parameterstable.className = "parameterstable"
  this.parametersdiv.appendChild(this.parameterstable)

  element = this.parametersdiv.querySelector("button#updateButton")
  if (element === null) {
    element = document.createElement("button")
    element.innerHTML = "Update"
    element.id = "updateButton"
  }
  element.onclick = function(e) {
    that.rebuildSolid()
  }
  this.parametersdiv.appendChild(element)

  // implementing instantUpdate
  var instantUpdateCheckbox = document.createElement("input")
  instantUpdateCheckbox.type = "checkbox" // Marcos , default ON.
  instantUpdateCheckbox.checked = "checked"
  instantUpdateCheckbox.id = "instantUpdate"
  // Marcos
  instantUpdateCheckbox.onchange = function(e) {
    that.instantUpdate_onChange()
  }
  this.parametersdiv.appendChild(instantUpdateCheckbox)

  element = document.getElementById("instantUpdateLabel")
  if (element === null) {
    element = document.createElement("label")
    element.innerHTML = "Instant Update"
    element.id = "instantUpdateLabel"
  }
  element.setAttribute("for", instantUpdateCheckbox.id)
  this.parametersdiv.appendChild(element)

  this.enableItems()
  this.clearViewer()
}

/**
 * Sobrescribo la función createElements para adaptarla a
 * los divs de cocada
 */

module.exports = Processor
