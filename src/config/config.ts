export const config={
    port:process.env.PORT||3000,
    mongoDbURL:process.env.MONGO_URI ||'mongodb://localhost:27017/rbac_demo',
    jwtSecret:process.env.JWT_SECRET||'REWSjsSEfjk12W49PP',
    jwtExpiresIn:process.env.JWT_EXPIRES_IN||'7d',
    bcryptSaltRounds:process.env.BCRYPT_SALT_ROUNDS||10
}