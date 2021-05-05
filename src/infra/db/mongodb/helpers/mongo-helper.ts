import { Collection, Db, MongoClient } from 'mongodb'

export const MongoHelper = {
  connection: null as MongoClient,
  db: null as Db,
  uri: null as string,

  async connect (uri: string) {
    this.uri = uri

    this.connection = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    this.db = await this.connection.db()
  },

  async disconnect () {
    await this.connection.close()
    this.connection = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.connection?.isConnected()) {
      await this.connect(this.uri)
    }

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
