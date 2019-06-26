import { Stories } from '/imports/db';

Stories.after.insert(function (userId, doc) {
    doc.createdAt = new Date();
});