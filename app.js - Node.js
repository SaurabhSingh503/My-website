const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload-profile', upload.single('profilePic'), (req, res) => {
    // Handle profile picture upload
    res.redirect('/');
});

app.post('/upload-certificate', upload.array('certificates', 10), (req, res) => {
    // Handle certificate PDF uploads
    res.redirect('/');
});

app.post('/upload-experience', upload.array('experience', 10), (req, res) => {
    // Handle experience document uploads
    res.redirect('/');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
