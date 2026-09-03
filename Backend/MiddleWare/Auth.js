import jwt from 'jsonwebtoken';
const UserAuth= async (req,res,next) => {
    const {token} = req.headers;
  try{
      if(!token){
        return res.status(401).json({
            success: false, 
            message: "No token provided.",
          });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.body.userId = decoded.id;
    
    next();
  }
  catch(error){
    console.error("Authentication error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
      error: error.message,
    });
  }
}

export default UserAuth;