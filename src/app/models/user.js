import bcrypt from 'bcrypt';

import Logger from 'Logger';
import config from 'config/appConfig';
import { ModelBase } from 'database';
import UserIndex, { transform } from 'indexes/UserIndex';

export const TYPE_DEMO_USER = 'DemoUser';
export const TYPE_LIMITED_ACCESS_USER = 'LimitedAccessUser';
export const FULL_ACCESS_USER = 'FullAccessUser';

const logger = new Logger('User');

const User = ModelBase.extend({
  tableName: 'users',
  hasTimestamps: true,

  initialize() {
    this.on('saved', this.savedHooks);
  },

  validatePassword(candidatePassword, cb) {
    const cryptedPassword = bcrypt.hashSync(candidatePassword, config.auth.bcryptSalt);
    if (cryptedPassword === this.get('encrypted_password')) {
      cb(null, true);
    } else {
      cb('password is invalid');
    }
  },

  async savedHooks(model, resp, options) {
    // force indexing data after search terms extracted.
    const userIndex = new UserIndex(transform(model));

    await userIndex.save();
  },
});

User.findOrCreate = function findOrCreate(attributes, transacting) {
  return User
        .findOne({ email: attributes.email }, { transacting })
        .then((user) => {
          logger.debug(attributes.email);
          logger.debug(`user found by email ${attributes.email}`);
          return user;
        })
        .catch((err) => {
          logger.debug(`user does not exist by email ${attributes.email}`);
          return User.forge(attributes).save(null, { transacting });
        });
};

export default User;
