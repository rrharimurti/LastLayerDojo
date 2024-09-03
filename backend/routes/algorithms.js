const router = require('express').Router();
let Algorithm = require('../models/algorithm.model')

/*
FOR TESTING:

router.route('/').get((req, res) => {
    Algorithm.find()
        .then(algorithms => res.json(algorithms))
        .catch(err => res.status(400).json(`Error ${err}`));
});
*/

// Get All Algorithms by Username
router.route('/:username').get((req, res) => {
    Algorithm.find({username: req.params.username})
        .then(algorithms => res.json(algorithms))
        .catch(err => res.status(400).json(`Error ${err}`))
});

// Get ONE Algorithm by Username and Index
router.route('/:username/:index').get((req, res) => {
    Algorithm.find({username: req.params.username, index: req.params.index})
        .then(algorithms => res.json(algorithms))
        .catch(err => res.status(400).json(`Error ${err}`))
});

// Add Algorithm
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const index = req.body.index;
    const main_algo = req.body.main_algo;
    const alt_algo = req.body.alt_algo;
    const time = Number(req.body.time);

    const newAlgorithm = new Algorithm({username, index, main_algo, alt_algo, time,});

    newAlgorithm.save()
        .then(() => res.json('Algorithm successfully added'))
        .catch(err => res.status(400).json(`Error ${err}`));

});

// Delete ALL Algorithms by Username
router.delete('/delete/:username', async (req, res) => {
    try {
      const username = req.params.username;
      const result = await Algorithm.deleteMany({ username: username });
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'No algorithms found for this user' });
      }
      
      res.status(200).json({ message: 'Algorithms deleted successfully', count: result.deletedCount });
    } catch (error) {
      console.error('Error deleting algorithms:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Patch Time
router.patch('/update/time', async (req, res) => {
    try {
        const { username, index, time } = req.body;
        const result = await Algorithm.findOneAndUpdate(
            { username, index },
            { $set: { time } },
            { new: true } // returns updated algorithm
        );
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'Algorithm not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Patch Main and Alternative Algorithms
router.patch('/update/algorithm', async (req, res) => {
    try {
        const { username, index, main_algo, alt_algo } = req.body;
        const result = await Algorithm.findOneAndUpdate(
            { username, index },
            { $set: { main_algo, alt_algo } },
            { new: true } // returns updated algorithm
        );
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'Algorithm not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;