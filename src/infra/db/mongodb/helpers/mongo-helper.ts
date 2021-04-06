import { Collection, Db, MongoClient } from 'mongodb'

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
  },

  getCollection (name: string): Collection {
    return this.db.collection(name)
  },

  map (collection: any): any {
    const { _id, ...collectionWithoutId } = collection

    const mappedCollection = {
      id: _id,
      ...collectionWithoutId
    }

    return mappedCollection
  }
}
