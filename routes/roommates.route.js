import { Router } from "express";
import { roommatesController } from "../controllers/roommates.controller.js";


const router = Router();


router.post('/roommate', roommatesController.postRoommate)

router.get('/roommates', roommatesController.getRoommates)

router.post('/gasto', roommatesController.postGasto)

router.get('/gastos', roommatesController.getGastos)

router.put('/gasto', roommatesController.updateGasto)

router.delete('/gasto', roommatesController.removeGasto)


export default router;