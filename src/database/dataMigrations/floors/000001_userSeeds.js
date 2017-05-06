import { wrap } from '../elevatorHelper';
import UsersSeeder from '../../seeds/components/UsersSeeder';
import SeedRunner from '../../seeds/helpers/SeedRunner';

module.exports = {
  onUp: wrap(async (floorWorkerParameters) => {
    const seedRunner = new SeedRunner();
    const ComponentClasses = [
      UsersSeeder,
    ];

    seedRunner.addSeeds(ComponentClasses);
    await seedRunner.run();
  }),

  onDown: wrap(async (floorWorkerParameters) => {

  }),

};
