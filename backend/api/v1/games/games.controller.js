let config = require('../../../config');
const Joi = require('joi');
const resultEnum = require('./result.enum');

const Game = {
    board: Joi.string()
};

function JOI_VALIDATE(data) {
    let {error} = Joi.validate(data, Game);
    if (error) {
        throw "Bad request"
    } else {
        return true;
    }
}

function fetchGame(body) {
    const res = playMove(body.board);
    return {...body, board: res.board, status: res.status};
}

function GetRowColComb(Arr, index, row) {
    let temp = [];
    for (let i = 0; i < Arr.length; i++) {
        temp.push((Arr.length * parseInt([row ? index : i])) + parseInt([row ? i : index]))
    }
    return temp;
}

function playMove(state, symbol = 'X') {
    let tempArr = state.split('');
    const sliceArray = [];
    for (let i = 0; i < tempArr.length; i += config.SIZE) {
        sliceArray.push(tempArr.slice(i, i + config.SIZE))
    }

    // 1.Check all possible combinations
    const allWinCombs = getAllCombs(sliceArray);
    console.log('All combinations :' + JSON.stringify(allWinCombs))
    //2.Check if i am winning
    const winingCombIndex = getWinningComb(allWinCombs, tempArr, 'O');
    if (winingCombIndex > -1) {
        return {board: updateState(allWinCombs, winingCombIndex, 'O', tempArr), status: resultEnum.O_WON};
    }
    console.log('All combinations :' + JSON.stringify(allWinCombs))
    // 3.Restrict if opponent is winning
    const oponentWinCombIndex = getWinningComb(allWinCombs, tempArr, symbol);
    if (oponentWinCombIndex > -1) {
        return {board: updateState(allWinCombs, oponentWinCombIndex, 'O', tempArr), status: resultEnum.RUNNING};
    }

    //4.check If draw then return
    let empCount = 0;
    for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i] !== '-') {
            empCount++;
        }
    }
    if (empCount > 0) {
        //5.General rules

        const center = parseInt(tempArr.length / 2);
        if (tempArr[center] === '-') {
            tempArr[center] = 'O';
            return {board: tempArr.join(''), status: resultEnum.RUNNING};
        }
        //Check if cornors free
        let cornors = [];
        cornors.push((config.SIZE * 0) + 0);
        cornors.push((config.SIZE * 0) + (config.SIZE - 1));
        cornors.push((config.SIZE * (config.SIZE - 1)) + 0);
        cornors.push((config.SIZE * (config.SIZE - 1)) + (config.SIZE - 1));
        for (let i = 0; i < cornors.length; i++) {
            if (tempArr[cornors[i]] === '-') {
                tempArr[cornors[i]] = 'O';
                return {board: tempArr.join(''), status: resultEnum.RUNNING};
            }
        }
    } else {
        return {board: tempArr.join(''), status: resultEnum.DRAW}
    }

    return {board: tempArr.join(''), status: resultEnum.DRAW};


}

function updateState(combinations, index, symbol, tempArr) {
    for (let i = 0; i < combinations[index].length; i++) {
        if (tempArr[combinations[index][i]] === '-') {
            tempArr[combinations[index][i]] = symbol;
        }
    }
    return tempArr.join('');
}

function getAllCombs(Arr) {
    let temp = [];
    for (let i = 0; i < config.SIZE; i++) {
        temp.push(GetRowColComb(Arr, i, true));
        temp.push(GetRowColComb(Arr, i, false));
    }
    temp.push(getPDiagonalComb(Arr));
    temp.push(getSDiagonalComb(Arr));
    return temp;
}

function getWinningComb(combinations, sliceArr, symbol) {
    let findComb = -1;
    for (let i = 0; i < combinations.length; i++) {
        let count = 0, emptyCount = 0;
        for (let j = 0; j < combinations[i].length; j++) {
            if (sliceArr[combinations[i][j]] === symbol) {
                count++;
            } else if ((sliceArr[combinations[i][j]] === '-')) {
                emptyCount++;
            }
        }
        if (count === 2 && emptyCount === 1) {
            findComb = i;
            break;

        }
    }
    return findComb;
}

function getPDiagonalComb(Arr, symbol) {
    let temp = [];
    for (let i = 0; i < config.SIZE; i++) {
        temp.push((Arr.length * i) + i);
    }
    return temp;
}

function getSDiagonalComb(Arr, symbol) {
    let temp = [];
    for (let i = 0; i < config.SIZE; i++) {
        temp.push((Arr.length * i) + (config.SIZE - i) - 1);
    }
    return temp;
}


module.exports = {
    fetchGame,
    JOI_VALIDATE
};
