import dotenv from 'dotenv'

class Config {
  ConfigNames: string[] = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_DB']
  config: { [key: string]: string } = {}

  constructor() {
    dotenv.config({ path: 'env/.env' })

    this.ConfigNames.forEach((key) => {
      if (!process.env[key]) console.error(`ENV ${key} not set`)
      this.config[key] = process.env[key] || ''
    })
  }
}

export default new Config()
