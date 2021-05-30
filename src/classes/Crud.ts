export class Crud implements ICrud {
  constructor(private model: any) {}

  create(data: object): any {
    const document = new this.model(data);
    return document;
  }

  async searchAll(): Promise<Array<object>> {
    const documents = await this.model.find({}, { __v: 0, _id: 0 });
    return documents;
  }

  async searchOne(field: string, data: string | number): Promise<object | null> {
    const document = await this.model.findOne(
      { [`${field}`]: data },
      { __v: 0 }
    );
    return document;
  }

  async deleteResource(field: string, data: string | number): Promise<object | null> {
    const deleted = await this.model.findOneAndRemove({ [`${field}`]: data });
    return deleted;
  }

  updateResource(body: object, field: string, data: string | number): Promise<any> {
    const updated = this.model.findOneAndUpdate({ [`${field}`]: data }, body);
    return updated;
  }
}