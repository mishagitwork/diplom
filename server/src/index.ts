import 'module-alias/register'
import app from '@delivery'
import repository from '@repository'

async function main() {
  await repository.connect()
  await app.listen(4000)
}

main()
