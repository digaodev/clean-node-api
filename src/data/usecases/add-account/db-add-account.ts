import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  Encrypter,
  AddAccountRepository
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter, private readonly addAccountRepository: AddAccountRepository) {
  }

  async add (accountInput: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountInput.password)

    await this.addAccountRepository.add({
      ...accountInput,
      password: hashedPassword
    })

    return new Promise(resolve => resolve(null))
  }
}
