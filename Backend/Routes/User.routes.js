import express from 'express';
import { signupUser, loginUser, adminLogin } from '../Controllers/User.controllers.js';

const Userrouter = express.Router();

// Signup route
Userrouter.post('/signup', signupUser);
Userrouter.post('/login', loginUser);
Userrouter.post('/adminlogin', adminLogin);
export default Userrouter;