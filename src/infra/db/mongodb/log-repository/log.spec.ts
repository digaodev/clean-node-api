import { Collection } from 'mongodb'

import { LogMongoRepository } from './log'
import { MongoHelper } from '../helpers/mongo-helper'

describe('Log Mongo Repository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  const makeSut = (): LogMongoRepository => {
    return new LogMongoRepository()
  }

  test('Should create an error log on success', async () => {
    const sut = makeSut()

    await sut.logError('any_stack_error')

    const count = await errorCollection.countDocuments()

    expect(count).toBe(1)
  })
})
