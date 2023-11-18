import { createSchema } from 'graphql-yoga';
import bcrypt from 'bcryptjs';

import Track from '../models/track';
import User from '../models/user';

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type User {
      id: ID!
      email: String!
      name: String
      password: String!
      # cart: Cart
    }

    type LoginResponse {
      success: Boolean!
      message: String!
      user: User
    }

    input TextBlockInput {
      text: String
      title: String
    }

    input TrackInput {
      title: String
      artist: String
      blocks: [TextBlockInput]
      tonality: String
    }

    type TextBlock {
      text: String
      title: String
    }

    type Track {
      id: ID!
      title: String
      artist: String
      blocks: [TextBlock]
      tonality: String
    }

    type Query {
      tracks: [Track]
      track(id: ID!): Track
      user: User
      authUser: User
    }

    type Mutation {
      addTrack(track: TrackInput!): Track
      removeTrack(id: ID!): Track
      editTrack(id: ID!, track: TrackInput!): Track
      register(email: String!, password: String!, name: String!): User
      login(email: String!, password: String!): LoginResponse
      logout: Boolean
    }
  `,
  resolvers: {
    Query: {
      tracks: () => Track.find({}),
      track: (_, { id }) => Track.findById(id),
      user: () => User.findOne({}),
      authUser: (_, __, { req }) => {
        console.log(req.session);
        if (!req.session.user) {
          return null;
        } else {
          return User.findById(req.session.user._id);
        }
      },
    },
    Mutation: {
      register: async (_, { email, password, name }) => {
        try {
          const candidate = await User.findOne({ email });

          if (candidate) {
            throw new Error('User already exists');
          }

          const hashPassword = await bcrypt.hash(password, 10);
          const user = new User({
            email,
            name,
            password: hashPassword,
            // cart: { items: [] },
          });

          await user.save();
          return user;
        } catch (e) {
          throw new Error('Registration failed');
        }
      },
      login: async (_, { email, password }, { req }) => {
        try {
          const candidate = await User.findOne({ email });

          if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password);
            if (areSame) {
              req.session.user = candidate;
              req.session.isAuthenticated = true;

              return { user: candidate, success: true, message: 'Авторизация прошла успешно' };
            } else {
              return { success: false, message: 'Неверный пароль' };
            }
          } else {
            return { success: false, message: 'Пользователь не найден' };
          }
        } catch (e) {
          console.log(e);
          throw new Error('Ошибка авторизации');
        }
      },
      logout: async (_, __, { req, res }) => {
        req.session.isAuthenticated = false;
        req.session.destroy();
        return true;
      },
      addTrack: (_, { track }) => Track.create(track),
      removeTrack: (_, { id }) => Track.findByIdAndDelete(id),
      editTrack: (_, { id, track }) => Track.findByIdAndUpdate(id, track),
    },
  },
});
