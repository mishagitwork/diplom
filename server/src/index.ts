import 'module-alias/register'
import app from '@delivery'
import repository from '@repository'
import UC from '@useCases'

async function main() {
  await repository.connect()
  await app.listen(4000)
  await UC.userService.create({
    fullName: 'SuperAdmin',
    login: 'superadmin',
    password: 'admin',
    isAdmin: true,
  })
}

main()
