import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import "dotenv/config";

const rateLimit = new Ratelimit({
  redis:Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(4, '60 s'),
}) 

export default rateLimit;