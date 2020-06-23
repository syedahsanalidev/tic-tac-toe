let express = require('express');
let router = express.Router();
const gameCtrl = require('./games.controller');
const resultEnum = require('./result.enum');
const uuid = require('uuid/v4'); // <== NOW DEPRECATED!

let games = [];

function addGame({board}) {
    const id = uuid();
    games.push({
        id,
        board: board,
        status: resultEnum.RUNNING
    });
    return id;
}

router.get('/', function (req, res, next) {
    try {
        res.status(200).json({data: games});
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get('/:game_id', function (req, res, next) {
    try {
        res.status(200).json({data: games.find((game) => game.id === req.params.game_id)});
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/', function (req, res, next) {
    try {
        gameCtrl.JOI_VALIDATE(req.body);
        const result = addGame(req.body);
        res.status(201).json({data: games});
    } catch (error) {
        res.status(400).json({reason: error});
    }
});

router.put('/:game_id', function (req, res, next) {
    try {
        const index = games.findIndex((game) => game.id === req.params.game_id);
        games[index].board = req.body.board;
        const result = gameCtrl.fetchGame(games[index]);
        games[index] = result;
        res.status(200).json({data: result});
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete('/:game_id', function (req, res, next) {
    try {
        const index = games.findIndex((game) => game.id === req.params.game_id);
        games.splice(index, 1);
        res.status(200).json({data: games})
    } catch (error) {
        res.status(400).json(error);
    }
});
module.exports = router;
