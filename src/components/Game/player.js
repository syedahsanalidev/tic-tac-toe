import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {GetGameById, UpdateGame} from "../service";
import {Link} from "react-router-dom";

const Player = (props) => {
    const [state, setState] = useState({id: '', board: '---------', status: 'RUNNING'});

    const gameId = props.match.params.id;

    async function clickHandler(i, j) {
        tempArr[(i * 3) + j] = 'X';
        const {data} = await UpdateGame(gameId, {board: tempArr.join('')});
        setState(data);
    }

    useEffect(() => {
        async function fetchGameById() {
            const {data} = await GetGameById(gameId);
            setState(data);
        }

        fetchGameById();
    }, []);
    const tempArr = state.board.split('');
    const sliceArr = [];
    for (let i = 0; i < tempArr.length; i += 3) {
        sliceArr.push(tempArr.slice(i, i + 3))
    }
    return (
        <div>
            {sliceArr.map((item, i) => (
                <div>
                    {item.map((value, j) => (
                        <button disabled={state && (state.status === 'O_WON' || state.status === 'DRAW')} onClick={() =>
                            clickHandler(i, j)}>{value}</button>))}
                </div>))
            }
            <div>{state.status}</div>
            <Link to={'/'}>Back</Link>
        </div>
    )
};
export default withRouter(Player);
