/**
 * Главный файл с описанием коллекции Календаря
 */

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';
import resolvers from './resolvers.js';
import './fragments.js';
import mutations from './mutations.js';
import './permissions.js';
import './parameters.js';

const Calendar = createCollection({
  collectionName: 'Calendar',
  typeName: 'Calendar',
  schema,
  resolvers,
  mutations,
});

export default Calendar;
