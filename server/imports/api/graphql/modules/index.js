import Users from "./users.graphql";
import Stories from "./stories.graphql";
import Files from "./uploadFile.graphql";
import StoriesResolvers from "./stories.resolvers";
import UsersResolvers from "./users.resolvers";
import FilesResolvers from "./uploadFile.resolvers";


const typeDefs = [Users, Stories, Files];
const resolvers = [UsersResolvers, StoriesResolvers, FilesResolvers];

export { typeDefs, resolvers };
