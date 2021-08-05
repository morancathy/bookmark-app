const Bookmark = require('../models/bookmark')
const router = require('express').Router();

// Create
router.post('/', async (req, res) => {
  try {
    const createdBookmark = await Bookmark.create(req.body)
    res.status(200).json(createdBookmark)
  } catch(error) {
    console.error(error)
    res.status(400).json({
      message: error.message
    })
  }
});

// Read (Index)
router.get('/', async (req, res) => {
  try {
    const foundBookmarks = await Bookmark.find({})
    res.status(200).json(foundBookmarks)
  } catch(error) {
    console.error(error)
    res.status(404).json({
      message: error.message
    })
  }
});

// Read (Show)
router.get('/:id', async (req, res) => {
  try{
    const foundBookmark = await Bookmark.findById(req.params.id)
    res.status(200).json(foundBookmark)
  } catch(error){
    console.error(error)
    res.status(400).json({
      message: error.message
    })
  }
});

// Update
router.put('/:id', async (req, res) => {
  try{
    const updatedBookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedBookmark)
  } catch(error){
    console.error(error)
    res.status(400).json({
      message: error.message
    })
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedBookmark)
  } catch (error) {
    console.error(error)
    res.status(400).json({
      message: error.message
    })
  }
});

module.exports = router
