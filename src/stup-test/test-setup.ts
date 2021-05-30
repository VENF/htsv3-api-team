import { Application } from 'express';
import { Server } from '../server';
import mongoose from 'mongoose';

class SetupTest implements ISetupTest {
  server: IServer;
  app: Application;

  constructor() {
    this.server = new Server(4000);
    this.app = this.server.testing();
  }
  async database(databaseName: string) {
    let params: ISettignsData = {
      uri: `mongodb://localhost/${databaseName}`,
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
      }
    };
    await mongoose.connect(params.uri, params.options);
  }

  async removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName];
      await collection.deleteMany({});
    }
  }
  async dropAllCollections() {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName];
      try {
        await collection.drop();
      } catch (error) {
        console.log(error);
      }
    }
  }
  inicialize(dbName: string) {
    beforeAll(async () => {
      await this.database(dbName);
    });

    afterEach(async () => {
      await this.removeAllCollections();
    });

    afterAll(async () => {
      await this.dropAllCollections();
      await mongoose.connection.close();
    });
  }
}

export default new SetupTest();
