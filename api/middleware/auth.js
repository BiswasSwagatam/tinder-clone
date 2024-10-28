import User from "../models/User.js"
import jwt from "jsonwebtoken"


export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookie.jwt
        if(!token) {
            return res.status(401).json({ message: "Not authorized - no token provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) {
            return res.status(401).json({ message: "Not authorized - invalid token" })
        }
        
        const currentUser = await User.findById(decoded.id)

        req.user = currentUser
        next()
    } catch (error) {
        console.log("Error in protectRoute middleware: ",error)
        if (error instanceof jwt.JsonWebTokenError) {
			return res.status(401).json({
				success: false,
				message: "Not authorized - Invalid token",
			});
		} else {
			return res.status(500).json({
				success: false,
				message: "Internal server error",
			});
		}
    }
    
}