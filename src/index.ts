import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  targetTarget: HTMLElement
  templateTarget: HTMLElement
  wrapperSelectorValue: string
  newRecordExprValue: String

  static targets = ['target', 'template']
  static values = {
    wrapperSelector: {
      type: String,
      default: '.nested-form-wrapper'
    },
    newRecordExpr: {
      type: String,
      default: 'NEW_RECORD'
    }
  }

  add (e: Event) {
    e.preventDefault()

    const content: string = this.templateTarget.innerHTML.replace(new RegExp(this.newRecordExprValue, 'g'), new Date().getTime().toString())
    this.targetTarget.insertAdjacentHTML('beforebegin', content)
  }

  remove (e: Event): void {
    e.preventDefault()

    // @ts-ignore
    const wrapper: HTMLElement = e.target.closest(this.wrapperSelectorValue)

    if (wrapper.dataset.newRecord === 'true') {
      wrapper.remove()
    } else {
      wrapper.style.display = 'none'

      const input: HTMLInputElement = wrapper.querySelector("input[name*='_destroy']")
      input.value = '1'
    }
  }
}
