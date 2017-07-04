/**
 * Регистрируем фрагмент GraphQL, который используетсядля выборки данных
 */

import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
    fragment CalendarItemFragment on Calendar {
        _id
        createdAt
        userId
        user {
            displayName
        }
        startedAt
        finishedAt
        title
        description
        options
    }
`);
