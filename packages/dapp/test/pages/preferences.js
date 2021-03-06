let I

module.exports = {
  _init() {
    I = require('../steps')()
  },

  navigateTo() {
    I.navigateToUrl('/preferences')
  },

  assertImOnPage() {
    I.waitInUrl('/preferences', 5)
    I.waitForText('Preferences', 5, 'div.page-main-content h1')
  },

  async grabTimezoneValue() {
    let timezone = await I.grabTextFrom('.md-icon-text')
    return timezone.trim()
  },

  changeTimezoneValue(timezone) {
    const timezoneOptions = 'ul[id="1-menu-options"]'
    I.cssClick('div[id="1-toggle"]')
    I.waitForVisible(timezoneOptions, 5)
    I.displayFullSelectField(timezoneOptions)
    I.cssClick(`div[data-value="${timezone}"]`)
  },

  submitForm() {
    I.cssClick('div.call-to-action button[type="submit"]')
  },

  checkTimezoneHasChanged(timezone) {
    I.seeTextEquals(
      `${timezone}\nkeyboard_arrow_down`,
      'div.md-select-field__toggle'
    )
  },

  resetForm() {
    I.cssClick('div.call-to-action button[type="button"]')
  }
}
