import { createClient } from "redis";
import Config from "../config.mjs";

const redisClient = createClient({
    // username: Config.REDIS_USER,
    // password: Config.REDIS_PASS,
    socket: {
        host: Config.REDIS_HOST,
        port: Config.REDIS_PORT,
        tls: false
    }
});

export default redisClient;