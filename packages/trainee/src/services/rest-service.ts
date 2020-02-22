import m from 'mithril';

const log = console.log;
const error = console.error;
const trainerAPI = 'http://localhost:3030/api'

// export class RestService<T extends IBaseModel> {
export class RestService<T extends { $loki?: number }> {
  protected current: T = {} as T;
  protected list: T[] = [];
  protected filteredList: T[] = [];
  protected baseUrl: string;
  protected withCredentials = false;
  protected loki:number;
  protected meta: any;

  constructor(protected urlFragment: string) {
    this.baseUrl = this.createBaseUrl();

  }

  public getList() {
    return this.list;
  }

  public getCurrent() {
    return this.current;
  }

  public save(item: T, fd?: FormData) {
    return item.$loki ? this.update(item, fd) : this.create(item, fd);
  }

  public async create(item: T, fd?: FormData) {
    try {
      const result = await m.request<T>({
        method: 'POST',
        url: this.baseUrl,
        body: fd || item,
        withCredentials: this.withCredentials,
      });
      this.setCurrent(result);
      this.loki = result.$loki;
      this.addItemToList(this.current);
      return this.current;
    } catch (err) {
      return error(err.message);
    }
  }

  public async update(item: T, fd?: FormData) {
    item.$loki = this.loki;
    console.log(item);
    try {
      await m
        .request({
          method: 'PUT',
          url: this.baseUrl + String(this.loki),
          body: fd ||  JSON.stringify(item),
          withCredentials: this.withCredentials,
        })
        .catch(e => console.error(e));
      // this.setCurrent(data);
      this.current = item;
      this.updateItemInList(item);
      return this.current;
    } catch (err) {
      return error(err.message);
    }
  }

  public async delete(id = this.current.$loki) {
    try {
      await m.request<T>({
        method: 'DELETE',
        url: this.baseUrl + id,
        withCredentials: this.withCredentials,
      });
      this.removeItemFromList(id);
    } catch (err) {
      return error(err.message);
    }
  }

  public unload() {
    if (this.current) {
      this.new();
    }
  }

  public async load(id?: number | string): Promise<T | undefined> {
    if (id === '-1') {
      return this.current;
    }
    const result = await m.request<T>({
      method: 'GET',
      url: this.baseUrl + id,
      withCredentials: this.withCredentials,
    });
    if (!result) {
      console.warn('No result found at ' + this.baseUrl);
    }
    this.setCurrent(result || {} as T);
    this.updateItemInList(this.current);
    return this.current;
  }

  public async loadList(): Promise<T[] | undefined> {
    const result = await m.request<T[]>({
      method: 'GET',
      url: this.baseUrl,
      withCredentials: this.withCredentials,
    });
    if (!result) {
      console.warn('No result found at ' + this.baseUrl);
    }
    this.setList(result || []);
    return this.list;
    // try {
    //   const result = await m.request<T[]>({
    //     method: 'GET',
    //     url: this.baseUrl,
    //     withCredentials: this.withCredentials,
    //   });
    //   if (!result) {
    //     throw Error('No result found at ' + this.baseUrl);
    //   }
    //   this.setList(result);
    //   return this.list;
    // } catch (error) {
    //   if (this.useDevServer) {
    //     throw Error(`No result found at ${this.baseUrl}\n${error}`);
    //   }
    //   this.useDevServer = true;
    //   this.baseUrl = this.createBaseUrl(true);
    //   return this.loadList();
    // }
  }

  public new(item?: T) {
    this.setCurrent(item || ({} as T));
    return this.current;
  }

  public clearAllSessions(){
    this
      .loadList()
      .then(res => {
        res.forEach(session => {
          this.delete(session.$loki)
        });
      })
      .catch(error => console.log(error));
  }

  protected setList(value: T[]) {
    this.list = value;
  }

  // private createBaseUrl(): string {
  //   return `http://localhost:3000/${this.urlFragment}/`;
  // }
  /** Create the base URL, either using the apiService or the apiDevService */
  protected createBaseUrl(): string {
    return `${trainerAPI}/${this.urlFragment}/`;
  }

  private setCurrent(value: T) {
    const old = this.current;
    this.current = value;
  }

  private addItemToList(item: T) {
    this.setList([...this.list, item]);
  }

  private updateItemInList(item: T) {
    this.setList(this.list.map(i => (i.$loki === item.$loki ? item : i)));
  }

  private removeItemFromList(id?: string | number) {
    this.setList([...this.list.filter(i => i.$loki !== id)]);
    this.filteredList = this.filteredList.filter(i => i.$loki !== id);
  }
}
