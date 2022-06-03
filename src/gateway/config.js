const PORT = process.env.PORT || 8080;
const RATE_LIMIT_MINUTES = process.env.RATE_LIMIT_MINUTES || 15;
const RATE_LIMIT_MAX_HITS = process.env.RATE_LIMIT_MAX_HITS || 25;
module.exports = {
  PORT,
  RATE_LIMIT_MINUTES,
  RATE_LIMIT_MAX_HITS,
};
