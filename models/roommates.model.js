import { text } from "express";
import { pool } from "../database/connection.js";
import { nanoid } from "nanoid";

const allRoommates = async () => {
    const query = {
        text: `SELECT * FROM roommates`
    }
    const { rows } = await pool.query(query);
    return rows
}

const addRoomate = async (roommate) => {
    const query = {
        text: `INSERT INTO roommates (id, name) VALUES
        ($1, $2)
        RETURNING *`,
        values: [nanoid(), roommate]
    }
    const { rows } = await pool.query(query);
    return rows[0]
}

const allGastos = async () => {
    const query = {
        text: `	SELECT expenses.id AS expenses_id, roommates.id AS roommate_id, roommates.name AS roommate_name, expenses.amount, expenses.comment
                FROM roommates INNER JOIN expenses ON roommates.id = expenses.roommate_id;`
    }
    const { rows } = await pool.query(query);
    return rows
}

const updateExpend = async (expend) => {
    const query = {
        text: `UPDATE expenses
                SET amount = $2,
                    comment = $3
                WHERE id = $1
                RETURNING *;`,
        values: [expend.id, expend.amount, expend.comment]
    }
    const { rows } = await pool.query(query);
    return rows
}

const removeExpend = async (id) => {
    const query = {
        text: `DELETE FROM expenses
        WHERE id = $1
        RETURNING *;`,
        values: [id]
    }
    const { rows } = await pool.query(query);
    return rows[0]
}



export const roommatesModel = {
    allRoommates,
    addRoomate,
    allGastos,
    updateExpend,
    removeExpend
}