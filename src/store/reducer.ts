import { bookReducer } from '@/layout/commonLayout/models';
import { globalReducer } from './globalReducer';

export const appReducer = {
    book: bookReducer,
    global: globalReducer
};
