const { ApolloServer, gql } = require('apollo-server');

// Mock API data
const { posts } = require('./posts.json');

// GraphQL schema
const typeDefs = gql`
 type Image {
  width: Int
  height: Int
  aspectRatio: Float
  url: String
  hash: String
  mp4Url: String
 }

 type Post {
  id: ID
  image: Image
  tags: [String]
 }

 type Query {
  getPosts: [Post]
 }
`;

// Resolvers
const resolvers = {
 Query: {
  getPosts: () => posts
 }
};

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
 console.log(`Server is running at ${url}`);
});
