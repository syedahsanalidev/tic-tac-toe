import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

export async function GetGames() {
    const {data} = await axios.get(`${API_URL}/games`);
    return data;
}

export async function GetGameById(Id) {
    const {data} = await axios.get(`${API_URL}/games/${Id}`);
    return data;
}

export async function AddNewGame(body) {
    const {data} = await axios.post(`${API_URL}/games`, body);
    return data;
}

export async function UpdateGame(Id, body) {
    const {data} = await axios.put(`${API_URL}/games/${Id}`, body);
    return data;
}

export async function deleteGame(Id) {
    const {data} = await axios.delete(`${API_URL}/games/${Id}`);
    return data;
}
