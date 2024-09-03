const router = require('express').Router();
let User = require('../models/user.model')

/*
FOR TESTING:

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error ${err}`));
});
*/

// Get by Username
router.route('/:username').get((req, res) => {
    User.find({username: req.params.username})
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error ${err}`));
});

// Add User
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({username, password,});

    newUser.save()
        .then(() => res.json('User successfully added'))
        .catch(err => res.status(400).json(`Error ${err}`));

});

// Delete User
router.delete('/delete/:username', async (req, res) => {
    try {
      const username = req.params.username;
      const deletedUser = await User.findOneAndDelete({ username: username });
      
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;