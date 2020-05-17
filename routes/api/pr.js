const express = require('express');
const router = express.Router();
const passport = require('passport');

//PR Model
const PR = require('../../models/PR');
const User = require('../../models/User');

// @route  GET api/pr
// @desc   Show All prs
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    PR.find()
      .sort({ created: -1 })
      .then((pr) => res.json(pr));
  }
);

// @route   GET api/pr/:id
// @desc    Show PRs by ID
// @access  Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const pr = await PR.findById(req.params.id);
      if (!pr) {
        return res.status(404).json({ msg: 'PR not found' });
      }
      res.json(pr);
    } catch (err) {
      console.error(err.message);
      if (err.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'PR not found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/pr
// @desc    Create prs
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    const newPR = new PR({
      name: req.body.name,
      materials: req.body.materials,
      postedBy: req.user.id,
      deliveryTime: req.body.deliveryTime,
      status: req.body.status,
      userName: user.name,
    });

    newPR.save((err, pr) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(pr);
    });
  }
);

// @route   DELETE api/pr
// @desc    Delete a pr
// @access  Public
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const pr = await PR.findById(req.params.id);

      if (!pr) {
        return res.status(404).json({ msg: 'PR not found' });
      }

      //Check user
      if (pr.postedBy.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      await pr.remove();

      res.json({ msg: 'PR removed' });
    } catch (err) {
      console.error(err.message);
      if (err.kind == 'ObjectId') {
        return res.status(404).json({ msg: 'PR not found' });
      }
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
