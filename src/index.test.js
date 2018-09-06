const puppeteer = require('puppeteer')

const delay = require('./utils/delay')
const {setupPolly} = require('./utils/polly')
const {logRequest, logResponse} = require('./utils/loggers')
const {
  launchConfig,
  emulateConfig,
  gotoConfig,
  timeout
} = require('./utils/config')

function handleDialog(dialog) {
  console.log('DIALOG>>', dialog.message(), '<dismissed>')
  dialog.dismiss()
}

let browser
let polly
let date
let page

function ts(name) {
  return `${name}_on_${date.split('T')[0]}`
}

function screenshot(name, waitMs = 200) {
  return page
    .screenshot({
      path: `./__screenshots__/${name}.png`
    })
    .then(() => delay(waitMs))
}

beforeEach(async () => {
  date = new Date().toISOString()
  browser = await puppeteer.launch(launchConfig)
  const pages = await browser.pages()
  page = pages.length > 0 ? pages[0] : await browser.newPage()
  await page.emulate(emulateConfig)
  await page.setBypassCSP(true)
  page.on('request', logRequest)
  page.on('response', logResponse)
  page.on('dialog', handleDialog)
})

afterEach(async () => {
  await polly.stop()
  await delay(200)
  await browser.close()
})

test(
  '#1 Google',
  async () => {
    polly = await setupPolly(page, ts('Google'))

    await page.goto('https://www.google.com', gotoConfig(true))

    const eval1 = await page.evaluate(a => {
      const num = Math.random()
      alert(num)
      return Promise.resolve(a * 2)
    }, 21)
    expect(eval1).toBe(42)

    // Other actions...

    await screenshot(ts('Google'))
  },
  timeout
)

test(
  '#2 LinkedIn',
  async () => {
    polly = await setupPolly(page, ts('LinkedIn'))

    await page.goto('https://www.linkedIn.com', gotoConfig())

    // Other actions...

    await screenshot(ts('LinkedIn'))
  },
  timeout
)
