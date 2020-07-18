import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        posts: [Post!]!
    }

    extend type Mutation {
        createPost(body: String!): Boolean!
    }

    type Post {
        id: ID,
        body: String!
        user: User!
        comments: [Comment!]!
    }
`;