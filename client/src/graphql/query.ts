import { gql } from '@apollo/client';

export const $QueryTracks = gql`
  query {
    tracks {
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

export const $QueryTrack = gql`
  query ($id: ID!) {
    track(id: $id) {
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

export const $QueryUser = gql`
  query {
    user {
      name
      email
    }
  }
`;

export const $QueryAuthUser = gql`
  query {
    authUser {
      name
      email
    }
  }
`;
