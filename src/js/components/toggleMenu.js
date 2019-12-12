import { BEMblock } from '../helpers'

// import {
//   IS_ACTIVE, NO_SCROLL
// } from '../constants';

const HAS_OPEN_MENU = 'has-open-menu'
const IS_ACTIVE = 'active'
const IS_OPEN = 'open'
const NO_SCROLL = 'no-scroll'

const defaultParams = {
  classNames: {
    btn: 'burger',
    menu: 'menu',
  },
}

class Burger {
  constructor(options) {
    this.options = { ...defaultParams, ...options }
    this.classes = {}
    this.names = []
    this.menus = []
    this.btns = []
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

  get BEMtarget() {
    return BEMblock(this.menu, this.classes[this.name].menu)
  }

  _addListeners() {
    this.onClick = this.handleClick.bind(this)
    this.onKeyDown = this.handleKeyDown.bind(this)

    document.addEventListener('click', this.onClick)
    document.addEventListener('keydown', this.onKeyDown)
  }

  _removeListeners() {
    document.removeEventListener('click', this.onClick)
    document.removeEventListener('keydown', this.onKeyDown)
  }

  handleClick(e) {
    this.toggle(e)
  }

  handleKeyDown(e) {
    if (e && e.code === 'Escape') this.close()
  }

  toggle(e) {
    this.btn = e.target.closest(`.${Burger.classNames.burger}`)
    if (!this.btn) return

    e.preventDefault()
    e.stopPropagation()

    this.btns = [...document.querySelectorAll(`.${Burger.classNames.burger}`)]
    this.menus = [...document.querySelectorAll(`.${Burger.classNames.menu}`)]

    this.name = this.btn.getAttribute('data-menu-target') || 'default'
    this.menu =
      this.name && this.name !== 'default'
        ? document.querySelector(`.${Burger.classNames.menu}[data-menu="${this.name}"]`)
        : document.querySelector(`.${Burger.classNames.menu}`)
    if (!this.menu) return

    if (!this.menus.length || !this.btns.length || this.btns.length !== this.menus.length) return

    this.btns.forEach((btn, i) => {
      const name = btn.getAttribute('data-menu-target') || 'default'
      const btnClass = btn.getAttribute('data-block') || this.options.classNames.btn
      const menuClass = this.menus[i].getAttribute('data-block') || this.options.classNames.menu
      this.classes = {
        ...this.classes,
        [name]: {
          btn: btnClass,
          menu: menuClass,
        },
      }
    })

    if (!this.classes) return

    this.BEMbtn.toggleMod(IS_ACTIVE)
    this.BEMtarget.toggleMod(IS_OPEN)

    if (this.onToggle) this.onToggle()

    if (!this.BEMtarget.containsMod(IS_OPEN) && this.onClose) {
      this.onClose()
    }
  }

  close() {
    if (!this.btns.length || !this.menus.length || !this.classes) return

    this.names = Object.keys(this.classes)

    this.btns.forEach(btn => {
      this.names.forEach(name => {
        if (btn.getAttribute('data-menu-target') === name) {
          BEMblock(btn, this.classes[name].btn).removeMod(IS_ACTIVE)
        }
      })
    })

    this.menus.forEach(menu => {
      this.names.forEach(name => {
        if (menu.getAttribute('data-menu') === name) {
          BEMblock(menu, this.classes[name].menu).removeMod(IS_OPEN)
        }
      })
    })

    if (this.onClose) this.onClose()
  }
}

Burger.classNames = {
  burger: 'js-burger',
  menu: 'js-menu',
}

export default function toggleMenu() {
  const burger = new Burger()
  burger.onToggle = () => {
    document.body.classList.toggle(NO_SCROLL)
    document.body.classList.toggle(HAS_OPEN_MENU)
  }
  burger.onClose = () => {
    document.body.classList.remove(NO_SCROLL)
    document.body.classList.remove(HAS_OPEN_MENU)
  }
  burger.init()

  // close menu
  const close = 'js-menu-close'

  document.addEventListener('dblclick', e => {
    // const btn = e.target.closest(`.${close}`)
    // // const menu = e.target.classList.contains('js-menu') ? e.target : null;
    // // const closeBtn = btn || menu;
    // const closeBtn = btn
    // if (!closeBtn) return

    // e.preventDefault()
    burger.close()
  })
}
