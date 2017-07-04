import { addRoute } from 'meteor/vulcan:core';

import CalendarComponent from '../components/calendar/CalendarComponent.jsx';

addRoute({ name: 'calendar', path: '/', component: CalendarComponent });
