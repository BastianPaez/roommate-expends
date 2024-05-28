import { handleErrorPostgre } from '../database/errors.database.js'
import { roommatesModel } from '../models/roommates.model.js';

const getRoommates = async (req, res) => {
    try {
        const roommates = await roommatesModel.allRoommates();
        return res.json( {roommates} )
    } catch (error) {
        handleErrorPostgre();
    }
}

const postRoommate = async (req, res) => {
    try {
        const {name} = req.body;
        const roommate = await roommatesModel.addRoomate(name);
        return res.json( {roommate} )
    } catch (error) {
        handleErrorPostgre();
    }
}


const postGasto = async (req, res) => {
    try {
        const {id, comentario, monto} = req.body;
        const gasto = await roommatesModel.addGasto(id, comentario, monto);
        return res.json( {gasto} )
    } catch (error) {
        handleErrorPostgre();
    }
}

const getGastos = async (req, res) => {
    try {
        const gastos = await roommatesModel.allGastos();
        return res.json( {gastos} )
    } catch (error) {
        handleErrorPostgre();
    }
}

const updateGasto = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, comment } = req.body;
        const gastoUpdated = await roommatesModel.updateExpend({ id, amount, comment });
        return res.json( {gastoUpdated} )
    } catch (error) {
        handleErrorPostgre();
    }
}

const removeGasto = async (req, res) => {
    try {
        const { id } = req.params;
        const gasto = await roommatesModel.removeExpend(id);
        return res.json( {gasto} )
    } catch (error) {
        handleErrorPostgre();
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