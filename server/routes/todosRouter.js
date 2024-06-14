const { Router } = require("express");
const Todos = require("../models/todos");
const router = Router()


const secretkey = 'secret key'
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, secretkey, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
      })
}

router.route('/', authenticateToken)
    .get(async (req, res) => {
        const allTodos = await Todos.find({ userId: req.user._doc._id })
        res.json(allTodos)
    })
    .post(async (req, res) => {
        const newToDo = await Todos.create({ text: req.body.text, userId: req.user._doc._id })
        res.json(newToDo)
    })



module.exports = router