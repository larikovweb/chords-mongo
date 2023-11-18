import Note from '../models/note';

const resolvers = {
  Query: {
    note: () => 'Book Title',
  },
  Mutation: {
    addBookTitle: async (_, { title }) => {
      try {
        const newBook = new Note({
          text: title,
        });
        await newBook.save();

        return 'Book Title added successfully';
      } catch (error) {
        console.error('Error adding Book Title:', error);
        return 'Error adding Book Title';
      }
    },
  },
};

export default resolvers;
