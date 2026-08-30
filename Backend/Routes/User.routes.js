import express from 'express';
import { signupUser, loginUser, adminLogin } from '../Controllers/User.controllers.js';

const UserRouter = express.Router();

// Signup route
UserRouter.post('/signup', signupUser);
UserRouter.post('/login', loginUser);
UserRouter.post('/adminlogin', adminLogin);
export default UserRouter;