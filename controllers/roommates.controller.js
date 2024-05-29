import { handleErrorPostgre } from '../database/errors.database.js'
import { roommatesModel } from '../models/roommates.model.js';

const getRoommates = async (req, res) => {
    try {
        const roommates = await roommatesModel.allRoommates();
        return res.json( {roommates} )
    } catch (error) {
        handleErrorPostgre(error);
    }
}

const postRoommate = async (req, res) => {
    try {
        const {name} = req.body;
        const roommate = await roommatesModel.addRoomate(name);
        return res.json( {roommate} )
    } catch (error) {
        handleErrorPostgre(error);
    }
}


const postGasto = async (req, res) => {
    try {
        const {id, comentario, monto} = req.body;
        const gasto = await roommatesModel.addGasto(id, comentario, monto);
        return res.json( {gasto} )
    } catch (error) {
        handleErrorPostgre(error);
    }
}

const getGastos = async (req, res) => {
    try {
        const gastos = await roommatesModel.allGastos();
        return res.json( {gastos} )
    } catch (error) {
        handleErrorPostgre(error);
    }
}

const updateGasto = async (req, res) => {
    try {
        const {idGasto, idRoommate , comentarioNuevo, montoNuevo } = req.body;
        const gastoUpdated = await roommatesModel.updateExpend({ idGasto, idRoommate, comentarioNuevo, montoNuevo });
        return res.json( {gastoUpdated} )
    } catch (error) {
        handleErrorPostgre(error);
    }
}

const removeGasto = async (req, res) => {
    try {
        const { idGasto, idRoommate } = req.body;
        const gasto = await roommatesModel.removeExpend(idGasto, idRoommate);
        return res.json( {gasto} )
    } catch (error) {
        handleErrorPostgre(error);
    }
}


export const roommatesController = {
    getRoommates,
    postRoommate,
    getGastos,
    updateGasto,
    removeGasto,
    postGasto
}