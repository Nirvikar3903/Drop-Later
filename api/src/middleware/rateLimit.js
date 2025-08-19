// Simple rate limiting middleware (per IP)
const rateLimitWindow = 60 * 1000; // 1 min
const maxRequests = 20; // per IP per window
const ipStore = new Map();

export const rateLimit = (req, res, next) => {
  const ip = req.ip;
  const currentTime = Date.now();

  if (!ipStore.has(ip)) {
    ipStore.set(ip, []);
  }

  const timestamps = ipStore.get(ip).filter(ts => currentTime - ts < rateLimitWindow);
  timestamps.push(currentTime);

  ipStore.set(ip, timestamps);

  if (timestamps.length > maxRequests) {
    return res.status(429).json({ message: "Too many requests, slow down!" });
  }

  next();
};
