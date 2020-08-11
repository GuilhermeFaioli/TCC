const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const {jwtkey} = require('../../keys')

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    //authorization === Bearer ...
    if(!authorization) {
        return res.status(401).send({error: "Você deve estar logado"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token, jwtkey, async (err,payload) => {
        if(err) {
            return res.status(401).send({error: "Você deve estar logado"})
        }
        const {userId} = payload
        const user = await User.findById(userId)
        req.user = user
        next()
    })
}