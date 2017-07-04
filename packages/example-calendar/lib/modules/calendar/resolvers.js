/*

Three resolvers are defined:

- list (e.g.: moviesList(terms: JSON, offset: Int, limit: Int) )
- single (e.g.: moviesSingle(_id: String) )
- listTotal (e.g.: moviesTotal )

*/

import { addGraphQLResolvers } from 'meteor/vulcan:core';

// basic list, single, and total query resolvers
const resolvers = {

    list: {

        name: 'calendarList',

        resolver(root, {terms = {}}, context, info) {
            let {selector, options} = context.Calendar.getParameters(terms, {}, context.currentUser);
            return context.Calendar.find(selector, options).fetch();
        },

    },

    single: {

        name: 'calendarSingle',

        resolver(root, {documentId}, context) {
            const document = context.Calendar.findOne({_id: documentId});
            return context.Users.restrictViewableFields(context.currentUser, context.Calendar, document);
        },

    },

    total: {

        name: 'calendarTotal',

        resolver(root, {terms = {}}, context) {
            const {selector, options} = context.Calendar.getParameters(terms, {}, context.currentUser);
            return context.Calendar.find(selector, options).count();
        },

    }
};

// add the "user" resolver for the Movie type separately
const calendarUserResolver = {
  Calendar: {
    user(calendar, args, context) {
      return context.Users.findOne({ _id: calendar.userId }, { fields: context.Users.getViewableFields(context.currentUser, context.Users) });
    },
  },
};
addGraphQLResolvers(calendarUserResolver);

export default resolvers;
