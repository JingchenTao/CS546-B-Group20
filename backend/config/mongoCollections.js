import { dbConnection } from './mongoConnection.js';

const getCollectionFn = (collectionName) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collectionName);
    }
    return _col;
  };
};

const usersCol = getCollectionFn('users');
const parksCol = getCollectionFn('parks');
const reviewCol = getCollectionFn('review');
const commentCol = getCollectionFn('comment');
const historyCol = getCollectionFn('history');

export const users = usersCol;
export const parks = parksCol;
export const review = reviewCol;
export const reviews = reviewCol;

export const comment = commentCol;
export const comments = commentCol
export const history = historyCol;
