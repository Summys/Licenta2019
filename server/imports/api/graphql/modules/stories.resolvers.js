export default {
  Query: {
    stories(_, { filters, options }, { db }, ast) {
      $filters = filters;
      $options = options;
      const story = db.stories
        .astToQuery(ast, {
          $filters,
          $options,
        })
        .fetch();
      return story;
    },
  },
  Mutation: {
    storyCreate(_, { data }, { db }) {
      data.createdAt = new Date()
      const _id = db.stories.insert({
        ...data,
      });
      return db.stories.findOne(_id);
    },
    storyEdit(_, { storyId, data }, { db }) {
      db.stories.update(storyId, {
        $set: { ...data },
      });
      return db.stories.findOne(storyId);
    },
    storyDelete(_, { storyId }, { db }) {
      const storyDeletedId = db.stories.findOne(storyId);
      db.stories.remove(storyId);
      return storyDeletedId;
    },
  },
};
