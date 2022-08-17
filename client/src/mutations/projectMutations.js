import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
  mutation addProject(
    $name: String!
    $description: String!
    $status: ProjectStatus!
    $clientId: ID!
  ) {
    addProject(
      name: $name
      description: $description
      status: $status
      clientId: $clientId
    ) {
      id
      name
      description
      client {
        id
        name
        email
        phone
      }
      status
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      name
      description
      id
      status
      client {
        name
        phone
        email
        id
      }
    }
  }
`;

const EDIT_PROJECT = gql`
mutation updateProject($id: ID!, $name: String, $description: String, $status: ProjectStatusUpdate) {
  updateProject(id: $id, name: $name, description: $description, status: $status) {
    id
    name
    description
    status
    client {
      id
      name
      phone
      email
    }
  }
}
`  

export { ADD_PROJECT, DELETE_PROJECT, EDIT_PROJECT };
