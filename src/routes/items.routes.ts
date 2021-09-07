import { Router } from "express";
import { itemsController } from "../controllers/items_control";


const itemsRouter = Router();

itemsRouter.get('/', itemsController.listItems);
itemsRouter.get('/:id', itemsController.getItem);
itemsRouter.post('/', itemsController.insertItem)

export default itemsRouter;