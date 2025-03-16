import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try{
        console.log("Cookies: ", req.cookies);
        console.log("req.body: ", req.body);
        const token = req.cookies.token; // Get token from cookies
        if(!token) return res.status(401).json({errorMessage: "User not authenticated", success: false});

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode) return res.status(401).json({errorMessage: "User not authenticated", success: false});
        req.id = decode.userId;  // Set user id to req object
        next();
    } catch (error) {
        console.error(error);
    }
}

export default isAuthenticated;