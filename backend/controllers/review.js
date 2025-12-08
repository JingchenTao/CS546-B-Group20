import {ObjectId} from 'mongodb';

function checkIsProperString(val, variableName){
    if (val == null){
            throw `Provided input ( ${variableName} ) does not exist!`;
    }
    if (typeof(val) === 'string'){
            let target = val.trim();
            if (target.length < 1){
                throw `Provided input ( ${variableName} ) should not be empty!`;
            } 
            return target;
    } else {
            throw `Provided input ( ${variableName} ) should be string!`;
    }
}

function checkId(id, variableName) {
    id = checkIsProperString(id, variableName);
    if (!ObjectId.isValid(id)) throw `Provided input ( ${variableName} ) is invalid object ID!`;
    return id;
}

function checkIsProperRate(rate, variableName){
    if (typeof rate === 'undefined' || rate === null || typeof rate !== 'number' 
        || isNaN(rate) || !Number.isInteger(rate) || rate < 1 || rate > 5) {
        throw `Provided input ( ${variableName} ) should be an integer rate, choosing form 1 to 5!`;
    }

    return rate;

}

function checkIsProperReview(review, variableName){
    review = checkIsProperString(review, variableName);
    if ( review.length < 10 || review.length > 1000 || /(.)\1{4,}/.test(review)){
        throw 'This review must be at least 10 characters long and no more than 1000 characters long. And it should not have the same character repeated 5 times or more. ';
    }
    return review
}

    

export {
    checkIsProperString,
    checkId,
    checkIsProperRate,
    checkIsProperReview
};