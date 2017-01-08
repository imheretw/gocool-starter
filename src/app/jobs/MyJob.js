import _ from 'lodash';

import logger from 'logger';
import Job from './Job';

export default class MyJob extends Job {
  constructor() {
    super();

    this.QUEUE_NAME = 'email';
  }

  run(job, done) {
    // you should implement the run method.
    logger.debug(`run my job`);
  }

  // addtional required arguments for job handler
  /*
  getPayload() {
    return {
      x: 1,
      y: 2
    };
  }
  */
}
