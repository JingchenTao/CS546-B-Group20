import { ObjectId } from 'mongodb';
import { history, users } from '../config/mongoCollections.js';
import { checkId, checkIsProperString} from '../controllers/review.js';



const getHistoryByUserId = async (userId) => {
    userId = checkId(userId, 'user ID');
    const usersCollection = await users();
    const user = await usersCollection.findOne({_id: new ObjectId(userId)});
    if (!user) {throw `No user with this user ID ( ${userId} )!`;}
    const historyCollection = await history();
    const historyList = await historyCollection.find({ user_id: new ObjectId(userId) }) .toArray();
    if (historyList.length === 0) { return []; }
    for(let r of historyList){
        r._id = r._id.toString();
        r.user_id = r.user_id.toString();
    }
    return historyList;
};


const getHistoryByHistoryId = async (historyId) => {
    historyId = checkId(historyId, 'history ID');
    const historyCollection = await history();
    const currentHistory = await historyCollection.findOne({_id: new ObjectId(historyId)});
    if (!currentHistory) {throw `No history with this history ID ( ${historyId} )!`;}
    currentHistory._id = currentHistory._id.toString();
    currentHistory.user_id = currentHistory.user_id.toString();
    currentHistory.target_id = currentHistory.target_id.toString();
    return currentHistory;
};



const addHistory = async (
    userId,
    target_id,
    target_type,
    operation,
    content,
    detail
) => {
    try {
        userId = checkId(userId, 'user ID');
        target_id = checkId(target_id, 'target_id ID');
        target_type = checkIsProperString(target_type, 'target_type');
        operation = checkIsProperString(operation, 'operation');
        content = checkIsProperString(content, 'content');
        if(!detail || typeof detail !== 'object' || Array.isArray(detail)){
            throw new Error('The provided detail must be an object');
        }
        const historyCollection = await history();

        if (['view','favorite_add','favorite_remove'].includes(operation)){
            const recentHistory = await historyCollection.findOne({
                user_id: new ObjectId(userId),
                target_type: target_type,
                target_id: new ObjectId(target_id),
                operation:operation,
                createdAt: { $gte: new Date(Date.now() - 30 * 1000) }
            });
            if(recentHistory) return;
        }
        let newHistory = {
            user_id: new ObjectId(userId),
            target_id: new ObjectId(target_id),
            target_type: target_type,
            operation: operation,
            content: content,
            detail: detail,
            createdAt: new Date()
        }
        
        await historyCollection.insertOne(newHistory);     
    } catch (e) {
        console.error('Failed to add history:', e);   
    }
};

const deleteHistoryByHistoryId = async (
    historyId
) => {
    historyId = checkId(historyId, 'history ID');
    let deletedhistory = await getHistoryByHistoryId(historyId);
    const historyCollection = await history();
    const deletionInfo = await historyCollection.findOneAndDelete({_id: new ObjectId(historyId)});
    if (!deletionInfo) {
        throw `Could not delete the history with id (${historyId})`;
    }
    return {history_id: deletionInfo._id.toString(), deleted: true};
};


export { getHistoryByUserId, getHistoryByHistoryId, addHistory, deleteHistoryByHistoryId };