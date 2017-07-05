import { replaceComponent, Utils } from 'meteor/vulcan:core';
import Layout from '../components/common/Layout.jsx';
import './calendar/collection.js'

replaceComponent('Layout', Layout);

import './routes.js'
