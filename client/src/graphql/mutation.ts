import { gql } from '@apollo/client';

export const $addTrack = gql`
  mutation ($track: TrackInput!) {
    addTrack(track: $track) {
      id
      title
      artist
      tonality
      blocks {
        title
        text
      }
    }
  }
`;

export const $removeTrack = gql`
  mutation ($id: ID!) {
    removeTrack(id: $id) {
      id
    }
  }
`;

export const $editTrack = gql`
  mutation ($id: ID!, $track: TrackInput!) {
    editTrack(id: $id, track: $track) {
      id
      title
      artist
      tonality
      blocks {
        text
        title
      }
    }
  }
`;

export const $register = gql`
  mutation ($email: String!, $password: String!, $name: String!) {
    register(email: $email, password: $password, name: $name) {
      email
      name
      password
    }
  }
`;

export const $login = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        name
      }
      success
      message
    }
  }
`;

export const $logout = gql`
  mutation {
    logout
  }
`;
