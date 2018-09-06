module.exports = Object.freeze({
  launchConfig: {
    args: ['--disable-http2'],
    dumpio: true,
    // >> devtools: true,
    headless: false,
    ignoreHTTPSErrors: true,
    slowMo: 200,
    timeout: 10000
  },

  emulateConfig: {
    userAgent: 'Headless-Chrome',
    viewport: {
      width: 1200,
      height: 1024
    }
  },

  gotoConfig: isIdle => ({
    waitUntil: isIdle ? 'networkidle0' : 'load'
  }),

  timeout: 30000
})
