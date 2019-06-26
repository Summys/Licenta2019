import { Meteor } from 'meteor/meteor';

const withMeteorBind = Meteor.bindEnvironment((callback) => {
    callback()
});

export default withMeteorBind;