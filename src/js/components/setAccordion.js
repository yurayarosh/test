import { BEMblock } from '../helpers'

// import { IS_ACTIVE } from '../constants'

const IS_ACTIVE = 'active'
const IS_OPEN = 'open'

const defaultParams = {
  classNames: {
    btn: 'accordion__title',
    item: 'accordion__content',
  },
}

class Accordion {
  constructor(options) {
    this.options = { ...defaultParams, ...options }
    this.classes = {}
    this.names = []
  }

  init() {
    this._addListeners()
  }

  destroy() {
    this._removeListeners()
  }

  get BEMbtn() {
    return BEMblock(this.btn, this.classes[this.name].btn)
  }

  get BEMitem() {
    return BEMblock(this.item, this.classes[this.name].item)
  }

  _addListeners() {
    this.onClick = this.handleClick.bind(this)

    document.addEventListener('click', this.onClick)
  }

  _removeListeners() {
    document.removeEventListener('click', this.onClick)
  }

  handleClick(e) {
    this.toggleAccordion(e)
  }

  toggleAccordion(e) {
    this.btn = e.target.closest(`.${Accordion.classNames.btn}`)
    if (!this.btn) return

    e.preventDefault()

    this.wrap = this.btn.closest(`.${Accordion.classNames.wrap}`)
    this.btns = [...document.querySelectorAll(`.${Accordion.classNames.btn}`)]
    this.items = [...document.querySelectorAll(`.${Accordion.classNames.item}`)]

    this.name = this.btn.getAttribute('data-accordion-btn') || 'default'
    this.item =
      this.name && this.name !== 'default'
        ? this.wrap.querySelector(`[data-accordion-item="${this.name}"]`)
        : this.btn.nextElementSibling
    if (!this.item) return

    this.btns.forEach((btn, i) => {
      const name = btn.getAttribute('data-accordion-btn') || 'default'
      const btnClass = btn.getAttribute('data-block') || this.options.classNames.btn
      const itemClass = this.items[i].getAttribute('data-block') || this.options.classNames.item
      this.classes = {
        ...this.classes,
        [name]: {
          btn: btnClass,
          item: itemClass,
        },
      }
    })

    if (!this.classes) return

    this.BEMbtn.toggleMod(IS_ACTIVE)
    this.BEMitem.toggleMod(IS_OPEN)

    if (this.onToggle) this.onToggle()
  }
}

Accordion.classNames = {
  wrap: 'js-accordion',
  btn: 'js-accordion-btn',
  item: 'js-accordion-item',
}

export default function setAccordion() {
  const accordion = new Accordion({
    // classNames: {
    //   // btn: 'btn',
    //   // item: 'item',
    // },
  })
  accordion.init()
}
