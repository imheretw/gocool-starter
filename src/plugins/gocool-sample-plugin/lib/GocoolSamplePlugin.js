import { Plugin, Server, Router } from 'gocool';
import Logger from 'Logger';

export default class GocoolSamplePlugin extends Plugin {
  constructor() {
    super();

    this._logger = new Logger('GocoolSamplePlugin');

    this.on(Server.EVENTS.STARTED, (server) => {
      this._init(server);
    });
  }

  getRoutes() {
    return [new Router().expressRouter];
  }

  _init(server) {
    this._logger.debug('Init gocool sample plugin after server started');
  }
}
