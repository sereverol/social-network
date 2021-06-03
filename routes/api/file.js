const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const File = require('../../models/File');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), auth, async (req, res) => {
  const fileName = req.file.filename;
  const filePath = req.file.path;

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newFile = new File({
      fileName,
      userName: user.name,
      filePath,
      user: req.user.id,
    });

    const file = await newFile.save();

    res.json(file);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const files = await File.find().sort({ date: -1 });
    res.json(files);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ msg: 'File not found' });
    }

    res.json(file);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'File not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    const filePath = file.filePath;
    const fileName = file.fileName;
    if (!file) {
      return res.status(404).json({ msg: 'File not found' });
    }

    if (file.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    fs.unlink(file.filePath, (err) => {
      if (err) throw err;
      console.log(`${fileName} has been removed succesfully!`);
    });

    await file.remove();
    res.json({ msg: 'File removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'File not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
