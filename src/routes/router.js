import { Router } from 'express';

import userRoutes from './user';
import middleware from '../middleware';

const router = Router();

const handleResponse = (req, res) => {
    res.status(res.locals.data.status).send({ data: res.locals.data });
};

router.use('/auth', userRoutes(Router, { handleResponse, middleware }));
router.use(middleware.user.jwt);

export default router;
