const express = require('express');
const router = express.Router();
const passport = require('passport');

//PR Model
const PR = require('../../models/PR');
const User = require('../../models/User');

// @route  GET api/pr/allprs
// @desc   Show All prs
// @access Private
router.get(
  '/allprs',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    PR.find()
      .sort({ created: -1 })
      .then((pr) => res.json(pr));
  }
);

// @route  GET api/pr/myprs
// @desc   Show All prs created by logged in user
// @access Private
router.get(
  '/myprs',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    PR.find({ postedBy: user._id })
      .sort({ created: -1 })
      .then((pr) => res.json(pr));
  }
);

// @route   GET api/pr/viewpr/:id
// @desc    Show PRs by ID
// @access  Private
router.get(
  '/viewpr/:id',
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

// @route   POST api/pr/add
// @desc    Create prs
// @access  Private
router.post(
  '/add',
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
// @access  Private
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

// @route     POST api/pr/material/:id
// @desc      Add material to PR
// @access    Private
router.post(
  '/material/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const pr = await PR.findById(req.params.id);

      const newMaterial = {
        materialName: req.body.materialName,
        quantity: req.body.quantity,
      };

      pr.materials.unshift(newMaterial);

      await pr.save();

      res.json(pr.materials);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     DELETE api/pr/material/:id/:material_id
// @desc      Delete material of PR
// @access    Private

router.delete(
  '/material/:id/:material_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const pr = await PR.findById(req.params.id);

      //pull out material
      const material = pr.materials.find(
        (material) => material.id === req.params.material_id
      );

      //Make sure material exists
      if (!material) {
        return res.status(404).json({ msg: 'Material does not exist' });
      }

      // Check user
      if (pr.postedBy.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      const removeMaterial = pr.materials
        .map((material) => material._id.toString())
        .indexOf(req.params.material_id);

      pr.materials.splice(removeMaterial, 1);

      await pr.save();

      res.json(pr.materials);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
