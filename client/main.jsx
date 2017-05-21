/* globals document */

import { Meteor } from 'meteor/meteor';
import { h, render } from 'preact';
import HomePage from '../imports/ui/pages/HomePage';

Meteor.startup(() => {
  render(<HomePage />, document.getElementById('react-root'));
});
