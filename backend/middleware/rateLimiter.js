import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {

        const {success} = await rateLimit.limit("my-rate-limit")
        if(!success){
            return res.status(429).json({error: "Too many requests, please try again later"})
        }
        
    } catch (error) {
        console.log("rate limit error", error);
        next(error);
    }
}

export default rateLimiter;
