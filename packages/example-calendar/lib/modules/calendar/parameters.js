import { addCallback } from 'meteor/vulcan:core';

function sortByStartedAt (parameters, terms) {
    return {
        selector: parameters.selector,
        options: {...parameters.options, sort: {startedAt: -1}}
    };
}

addCallback('calendar.parameters', sortByStartedAt);
