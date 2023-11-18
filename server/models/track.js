import { Schema, model } from 'mongoose';

const trackSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  blocks: [
    {
      text: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  ],
  tonality: {
    type: String,
    required: true,
  },
});

export default model('Track', trackSchema);
