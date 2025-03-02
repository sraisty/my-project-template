import baseConfig from '../../eslint.config.base.mjs'

const migrationIgnores = {
  ignores: ['**/migrations/*'],
}

export default [...baseConfig, migrationIgnores]
