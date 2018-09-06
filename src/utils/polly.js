const {Polly} = require('@pollyjs/core')
const PuppeteerAdapter = require('@pollyjs/adapter-puppeteer')
const FSPersister = require('@pollyjs/persister-fs')

Polly.register(PuppeteerAdapter)
Polly.register(FSPersister)

async function setupPolly(page, name) {
  await page.setRequestInterception(true)

  return new Polly(name, {
    adapters: ['puppeteer'],
    adapterOptions: {
      puppeteer: {page},
      requestResourceTypes: ['xhr', 'fetch']
    },
    logging: false,
    persister: 'fs',
    persisterOptions: {
      fs: {
        recordingsDir: '__recordings__'
      }
    },
    recordIfMissing: true,
    recordFailedRequests: true
  })
}

module.exports.setupPolly = setupPolly
