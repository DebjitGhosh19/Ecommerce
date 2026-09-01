import jwt from 'jsonwebtoken';
const AdminAuth= async (req,res,next) => {
    const {token} = req.headers;
    if(!token){
        return res.status(401).json({
            success: false,
            message: "No token provided.",
          });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded !== process.env.AdminEmail+process.env.AdminPassword){
        return res.status(401).json({
            success: false,
            message: "Invalid token.",
          });
    }
    next();
}

export default AdminAuth;