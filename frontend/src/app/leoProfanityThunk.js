import { createAsyncThunk } from '@reduxjs/toolkit';
import leoProfanity from 'leo-profanity';

const loadPrafanityDictionary = createAsyncThunk(
  'profanity/loadDictionary',
  async () => {
    leoProfanity.loadDictionary('ru');
  },
);

export default loadPrafanityDictionary;
