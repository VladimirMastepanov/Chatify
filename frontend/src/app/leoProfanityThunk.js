import { createAsyncThunk } from '@reduxjs/toolkit';
import leoProfanity from 'leo-profanity';

const loadPrafanityDictionary = createAsyncThunk(
  'profanity/loadDictionary',
  async () => {
    leoProfanity.loadDictionary('ru');
    leoProfanity.loadDictionary('en');
    leoProfanity.loadDictionary('es');
  },
);

export default loadPrafanityDictionary;
