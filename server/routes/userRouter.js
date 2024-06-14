const { Router } = require("express");
// const User = require("../models/user");
const router = Router()
const jwt = require('jsonwebtoken');



const secretkey = 'secret key'
const Users =[{ email: '11', password: '11', name: '11', id: 0, iat: 1718324488 }]
const ToDos=[{id:0, text:'нассать в подъезд', status:true},{id:0, text:'нассать в подъезд',status:false}]

function generateAccessToken(user) {
  return jwt.sign(user, secretkey)
}
function authenticateToken(req, res, next) {
  console.log('ya v middleware');
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, secretkey, (err, user) => {
    if (err) return res.sendStatus(403)
    console.log('user in middleware',user);
    req.user = user
    next()
  })
}

router.get('/todos', authenticateToken, async (req, res) => {
      console.log('user',req.user);
        const allTodos =  ToDos.filter((user)=>{
          if (user.id == req.user.id){
            return user
          } return false
        })
        res.json(allTodos)
    })
    router.post('/todos', authenticateToken, async (req, res) => {
        const newToDo = ToDos.push({ text: req.body.text, userId: req.user.id, status:false })
        res.json(newToDo)
    })

router.post('/user', authenticateToken, async (req, res) => {
  res.json(req.user)
})

router.route('/signin')
  .post(async (req, res) => {
    const { email, password, id } = req.body
    if (email && password) {
      const currentUser = await Users.find((user)=>{
        if (user.email == email){
          return user
        } return false
      })
      if (currentUser.password === password) {
        const tokenUser = { ...currentUser }
        const accessToken = generateAccessToken(tokenUser)
        return res.json({ accessToken: accessToken, name: currentUser.name, id:currentUser.id })
      }
      return res.sendStatus(401);
    }
    return res.sendstatus(403)
  })




router.route('/signup')
  .post(async (req, res) => {
    console.log(req.body);
    try {
      const name = req.body.name
      const email = req.body.email
      const password = req.body.password
      if (email && password && name) {
        const newUser = { email: email, password: password, name: name, id:Users.length }
        const tokenUser = { ...newUser }
        const accessToken = generateAccessToken(tokenUser)
        Users.push(newUser)
        return res.json({ accessToken: accessToken, name: newUser.name, id:newUser.id,  })
      }
      return res.sendStatus(401)

    } catch (error) {
      console.log(error);
      return res.sendStatus(403)
    }
  })


module.exports = router