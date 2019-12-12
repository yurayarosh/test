import { BEMblock } from '../helpers'

const IS_ACTIVE = 'active'

const defaultParams = {
  classNames: {
    btn: 'tabs__tab',
    item: 'tabs__item',
  },
}

class Tabs {
  constructor(options) {
    this.options = { ...defaultParams, ...options }
    this.classes = {}
  }

  init() {
    this._addListeners()
  }

  destroy() {
    this._removeListeners()
  }

  get btnClass() {
    return this.classes[this.name].btn
  }

  get itemClass() {
    return this.classes[this.name].item
  }

  get BEMbtn() {
    return BEMblock(this.btn, this.btnClass)
  }

  get BEMitem() {
    return BEMblock(this.item, this.itemClass)
  }

  toggleTabs(e) {
    this.btn = e.target.closest(`.${Tabs.classNames.tab}`)
    if (!this.btn) return

    e.preventDefault()
    this.wrap = this.btn.closest(`.${Tabs.classNames.wrap}`)
    if (!this.wrap) return

    this.btns = [...this.wrap.querySelectorAll(`.${Tabs.classNames.tab}`)]
    this.items = [...this.wrap.querySelectorAll(`.${Tabs.classNames.item}`)]
    this.name = this.btn.getAttribute('data-tabs-tab')
    this.item = this.wrap.querySelector(`[data-tabs-item="${this.name}"]`)
    if (!this.item) return

    if (!this.items.length || !this.btns.length || this.btns.length !== this.items.length) return

    this.btns.forEach((btn, i) => {
      const name = btn.getAttribute('data-tabs-tab')
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

    if (this.BEMbtn.containsMod(IS_ACTIVE)) return

    this.btns.forEach(btn => {
      BEMblock(btn, this.btnClass).removeMod(IS_ACTIVE)
    })
    this.items.forEach(item => {
      BEMblock(item, this.itemClass).removeMod(IS_ACTIVE)
    })

    this.BEMbtn.addMod(IS_ACTIVE)
    this.BEMitem.addMod(IS_ACTIVE)
  }

  handleClick(e) {
    this.toggleTabs(e)
  }

  _addListeners() {
    this.onCLick = this.handleClick.bind(this)

    document.addEventListener('click', this.onCLick)
  }

  _removeListeners() {
    document.removeEventListener('click', this.onCLick)
  }
}

Tabs.classNames = {
  wrap: 'js-tabs',
  tab: 'js-tabs-tab',
  item: 'js-tabs-item',
}

export default () => {
  const tabs = new Tabs()
  tabs.init()
}
