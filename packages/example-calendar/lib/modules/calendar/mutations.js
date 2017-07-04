/*

Описаны 3 стандартных метода

- new (e.g.: moviesNew(document: moviesInput) : Movie )
- edit (e.g.: moviesEdit(documentId: String, set: moviesInput, unset: moviesUnset) : Movie )
- remove (e.g.: moviesRemove(documentId: String) : Movie )

Каждый метод:

- Имеет собственное имя
- Валидирует пользователя

*/

import { newMutation, editMutation, removeMutation, Utils } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

const mutations = {

    new: {

        name: 'calendarNewItem',

        check(user) {
            if (!user) return false;
            return Users.canDo(user, 'calendar.new');
        },

        mutation(root, {document}, context) {

            Utils.performCheck(this.check, context.currentUser, document);

            return newMutation({
                collection: context.Calendar,
                document: document,
                currentUser: context.currentUser,
                validate: true,
                context,
            });
        },

    },

    edit: {

        name: 'calendarEditItem',

        check(user, document) {
            if (!user || !document) return false;
            return Users.owns(user, document) ? Users.canDo(user, 'calendar.edit.own') : Users.canDo(user, `calendar.edit.all`);
        },

        mutation(root, {documentId, set, unset}, context) {

            const document = context.Movies.findOne(documentId);
            Utils.performCheck(this.check, context.currentUser, document);

            return editMutation({
                collection: context.Calendar,
                documentId: documentId,
                set: set,
                unset: unset,
                currentUser: context.currentUser,
                validate: true,
                context,
            });
        },

    },

    remove: {

        name: 'calendarRemoveItem',

        check(user, document) {
            if (!user || !document) return false;
            return Users.owns(user, document) ? Users.canDo(user, 'calendar.remove.own') : Users.canDo(user, `calendar.remove.all`);
        },

        mutation(root, {documentId}, context) {

            const document = context.Calendar.findOne(documentId);
            Utils.performCheck(this.check, context.currentUser, document);

            return removeMutation({
                collection: context.Calendar,
                documentId: documentId,
                currentUser: context.currentUser,
                validate: true,
                context,
            });
        },

    },

};

export default mutations;
