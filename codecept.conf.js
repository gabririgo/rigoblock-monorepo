const config = {
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:8080',
      show: true
    }
  },
  include: {
    I: './steps_file.js'
  },
  mocha: {},
  bootstrap: false,
  teardown: null,
  hooks: [],
  tests: './test/*.test.js',
  timeout: 10000,
  name: 'rigoblock-dappv2'
}

module.exports = { config }
