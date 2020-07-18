import { gql } from 'apollo-server-express';

export default gql`
    extend type Mutation {
        createComment(comment: String!, postId: String!): Boolean!
    }

    type Comment {
        id: ID!
        comment: String!
        commentBy: User!
    }
`;