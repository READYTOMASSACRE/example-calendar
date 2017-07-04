import Users from 'meteor/vulcan:users';

const membersActions = [
    'calendar.new',
    'calendar.edit.own',
    'calendar.remove.own',
];
Users.groups.members.can(membersActions);

const adminActions = [
    'calendar.edit.all',
    'calendar.remove.all'
];
Users.groups.admins.can(adminActions);
