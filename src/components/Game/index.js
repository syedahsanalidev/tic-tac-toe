import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {AddNewGame, GetGames, deleteGame} from "../service";

const GameBoard = () => {

    const [games, setGames] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const {data} = await GetGames();
            setGames(data);
        }

        fetchData();
    }, []);

    async function createGame() {
        const {data} = await AddNewGame({board: '---------'});
        setGames(data);
    }

    async function deleteGames(Id) {
        const {data} = await deleteGame(Id);
        setGames(data);
    }

    return (
        <div className="container">
            <div className="row">
                <button onClick={() => createGame()}>Start Game</button>
                <div>
                    <h4>Available Games</h4>
                    {games.length > 0 && games.map(({id}, index) => (
                            <div><Link index={index} to={`./${id}`}>Play Game {index} </Link>
                                <button onClick={() => deleteGames(id)}>Delete</button>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};
export default GameBoard;
