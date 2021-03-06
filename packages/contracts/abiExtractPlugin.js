const fs = require('fs-extra')
const { CONTRACT_NAMES, TMP_DIR } = require('./constants')

class AbiExtractPlugin {
  apply(compiler) {
    const artifactsRegExp = new RegExp(
      CONTRACT_NAMES.map(contract => `(${contract}\.json)$`).join('|'),
      'i'
    )
    compiler.hooks.normalModuleFactory.tap('AbiExtractPlugin', nmf => {
      nmf.hooks.beforeResolve.tap('AbiExtractPlugin', result => {
        fs.ensureDirSync(`./${TMP_DIR}`)
        if (!result) return
        if (artifactsRegExp.test(result.request)) {
          const filename = result.request.split('/').pop()
          const json = require(`${result.context}/${filename}`)
          const newJson = {
            contract_name: json.contract_name,
            devDoc: json.devDoc,
            userDoc: json.userDoc,
            networks: Object.keys(json.networks)
              .map(network => ({
                [network]: {
                  abi: json.networks[network].abi,
                  address: json.networks[network].address
                }
              }))
              .reduce((acc, curr) => ({ ...acc, ...curr }))
          }
          fs.writeFileSync(`./${TMP_DIR}/${filename}`, JSON.stringify(newJson))
          result.context = `${__dirname}/${TMP_DIR}`
        }
        return result
      })
    })
    compiler.hooks.afterEmit.tap('AbiExtractPlugin', () => {
      fs.removeSync(`./${TMP_DIR}`)
    })
  }
}

module.exports = AbiExtractPlugin
