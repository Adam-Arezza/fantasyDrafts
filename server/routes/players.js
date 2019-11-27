const express = require('express')
const router = express.Router()

router.get('/:playerId', (req, res, next) => {
    if(!req.params.playerId){
        //add error handler
        res.status(400).send('No player ID')
    }
    else {
        req.player = req.params.playerId
        next()
    }
})

//returns details of a player
router.get('/', playersController.player)
//adds a player to a team
router.post('/:teamId', playersController.add)
//removes a player from a team
router.delete('/:teamId', playersController.remove)

module.exports = router
