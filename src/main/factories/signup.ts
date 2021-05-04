import { BcryptAdapter } from '../../infra/crypto/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { SignUpController } from '../../presentation/controllers/signup/signup'

export const makeSignUpController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter()

  const salt = 12
  const encrypter = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(encrypter, addAccountRepository)

  return new SignUpController(emailValidator, addAccount)
}
