import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import { locationsController } from "../controllers/locations_control";


const locationsRouter = Router();

locationsRouter.get('/', locationsController.listLocations);

locationsRouter.get('/:id', locationsController.getLocation);

locationsRouter.post('/', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.array().required(),
    })
}, { abortEarly: false }), locationsController.insertLocation);

locationsRouter.put('/:id',locationsController.updateLocation);

locationsRouter.delete('/:id',locationsController.deleteLocation);

export default locationsRouter;