const express = require("express");
const router = express.Router();

//PR Model
const PR = require("../../models/PR");

// @route  GET api/pr
// @desc   GET All prs
// @access Public 
router.get("/", (req, res) =>{
    PR.find()
        .sort({date: -1})
        .then(pr => res.json(pr))
});

// @route   POST api/pr
// @desc    Create prs
// @access  Public
router.post("/", (req, res) =>{
    const newPR = new PR({
        name: req.body.name,
        materials: req.body.materials
    });

    newPR.save((err, pr) => {
        if(err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(pr);
    });
});

// @route   DELETE api/pr
// @desc    Delete a pr
// @access  Public
router.delete("/:id", (req, res) => {
    PR.findById(req.params.id)
        .then(pr => pr.remove().then(() => res.json({
            success: true
        })))
        .catch(err => res.status(404).json({
            success: false
        }));
});

module.exports = router;