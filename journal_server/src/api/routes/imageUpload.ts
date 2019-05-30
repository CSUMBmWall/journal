import {Request, Response} from "express";
// import {Response} from "request";*/
var path = require('path');
var fs = require('fs');

const express = require('express');
const request = require('request');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req: any, file: any, cb: any ) {
        cb(null, './imageUploads/')
    },
    filename: function(req: any, file: any, cb: any) {
        // console.log('file.originalName ' + file.originalname);
        let fileName = fileExists(file.originalname);
        // console.log('fileName ' + fileName);
        cb(null, fileName);
    }
});

function fileExists(filename: any) {
    let dest = './imageUploads/' + filename;
    try {
        if (fs.existsSync(dest)) {
            return filename;
        } else {
            return filename;
        }
    } catch(err) {
        console.error(err)
    }
}

const upload = multer({storage: storage});


const router = express.Router();

router.post('/', upload.single('img'),(req: Request, res: Response) => {
    if (req.file) {
        const newPath = req.file.path.replace(/\\/g, '\/');
        res.status(200).json({
            fileLoc: 'http://localhost:3000/' + newPath
        });
    }
    res.status(500);
})

module.exports = router;
