import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        login(email: String!, password: String!): LoginRes!
    }

    extend type Mutation {
        register(registerInput: RegisterInput!): Boolean!
    }

    input RegisterInput {
        name: String!
        email: String!
        password: String!
    }

    type LoginRes {
        token: String!,
        user: User!
    }

    type User {
        name: String!,
        email: String!
    }
`;