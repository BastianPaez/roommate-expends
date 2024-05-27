import { Router } from "express";
import { roommatesController } from "../controllers/roommates.controller.js";


const router = Router();


router.post('/roommate', roommatesController.postRoommate)

router.get('/roommates', roommatesController.getRoommates)

router.get('/gastos', roommatesController.getGastos)

router.put('/gasto/:id', roommatesController.updateGasto)

router.delete('/gasto/:id', roommatesController.removeGasto)


export default router;