import { ObjectId } from 'mongodb';
import { history, users } from '../config/mongoCollections.js';
import { checkId, checkIsProperString} from '../controllers/review.js';



const getHistory = async (userId, target_type, operation) => {
    if (!userId && !target_type && !operation){
        throw  new Error('You should select at least one from user id, target_type and operation to filter the history!');
    }
    let search = {};
    if (userId) {
        userId = checkId(userId, 'user ID');
        const usersCollection = await users();
        const user = await usersCollection.findOne({_id: new ObjectId(userId)});
        if (!user) {throw `No user with this user ID ( ${userId} )!`;}
        search.user_id = new ObjectId(userId);
    }
    if(target_type){
        target_type = checkIsProperString(target_type, 'target_type');
        if(!['reviews', 'comments', 'parks', 'users'].includes(target_type))
            {throw `Please provide the target_type from reviews, comments, parks and users!`;}
        search.target_type = target_type;
    }
    if(operation){
        operation = checkIsProperString(operation, 'operation');
        if(!['view', 'create', 'update', 'delete','promote','favorite_add','favorite_remove' ].includes(operation))
            {throw `Please provide the operation from view, create, update, promote and delete, favorite_remove, favorite_remove operations!`;}
        search.operation = operation;

    }
    const historyCollection = await history();
    const historyList = await historyCollection.find(search) .sort({ createdAt: -1 }).toArray();
    if (historyList.length === 0) { return []; }
    for(let r of historyList){
        r._id = r._id.toString();
        r.user_id = r.user_id.toString();
        r.target_id = r.target_id.toString();
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

const deleteHistory = async (
    historyId,
    userId
) => {
    historyId = checkId(historyId, 'history ID');
    userId = checkId(userId, 'user ID');
    const usersCollection = await users();
    const user = await usersCollection.findOne({_id: new ObjectId(userId)});
    if (!user) {throw `No user with this user ID ( ${userId} )!`;}
    let deletedhistory = await getHistoryByHistoryId(historyId);
    const historyCollection = await history();
    const deletionInfo = await historyCollection.findOneAndDelete({_id: new ObjectId(historyId)});
    if (!deletionInfo) {
        throw `Could not delete the history with id (${historyId})`;
    }
    return {history_id: deletionInfo._id.toString(), deleted: true};
};


export { getHistory, getHistoryByHistoryId, addHistory, deleteHistory };