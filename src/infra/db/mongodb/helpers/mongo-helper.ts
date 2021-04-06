import { Db, MongoClient } from 'mongodb'

export const MongoHelper = {
  connection: null as MongoClient,
  db: null as Db,

  async connect (url: string) {
    this.connection = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    this.db = await this.connection.db()
  },

  async disconnect () {
    await this.connection.close()
  }
}
