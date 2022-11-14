module.exports = {
    secret : process.env.AUTH_SECRET || "db_secret",
    expires: process.env.AUTH_EXPIRES ||"24hs",
    rounds : process.env.AUTH_ROUNDS || 10
}