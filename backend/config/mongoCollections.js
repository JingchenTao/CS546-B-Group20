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

export const users = usersCol;
export const parks = parksCol;

// 原本只有单数导致报错，单复数都导出，兼容所有文件
export const review = reviewCol;
export const reviews = reviewCol;

export const comment = commentCol;
export const comments = commentCol;
