/**
 * SimpleSchema-compatible описанная JSON
 */

const schema = {

  // default properties

    _id: {
        type: String,
        optional: true,
        viewableBy: ['guests'],
    },
    createdAt: {
        type: Date,
        optional: true,
        viewableBy: ['guests'],
        onInsert: (document, currentUser) => {
            return new Date();
        }
    },
    userId: {
        type: String,
        optional: true,
        viewableBy: ['guests'],
        resolveAs: 'user: User',
    },

  // custom properties

    startedAt: {
        label: 'Started at',
        type: Date,
        optional: true,
        viewableBy: ['guests'],
        insertableBy: ['members'],
        editableBy: ['members'],
    },
    finishedAt: {
        label: 'Finished at',
        type: Date,
        optional: true,
        viewableBy: ['guests'],
        insertableBy: ['members'],
        editableBy: ['members'],
    },
    title: {
        label: 'Title',
        type: String,
        optional: true,
        viewableBy: ['guests'],
        insertableBy: ['members'],
        editableBy: ['members']
    },
    description: {
        label: 'Description',
        type: String,
        optional: true,
        control: 'textarea',
        viewableBy: ['guests'],
        insertableBy: ['members'],
        editableBy: ['members']
    },
    options: {
        label: 'Options',
        type: String,
        optional: true,
        viewableBy: ['guests'],
        insertableBy: ['members'],
        editableBy: ['members']
    },
};

export default schema;
