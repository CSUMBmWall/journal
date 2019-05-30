import {Request, Response} from "express";
import { Response as reqRes}  from "request";
import { MP3TagModel } from "../models/MP3Tag.model";
import request = require("request");
import {async} from "rxjs/internal/scheduler/async";

const express = require('express');
const router = express.Router();
const NodeID3 = require('node-id3');
const fs = require('fs');
const path = require('path');

let file = "D:\\Music\\Aretha Franklin - YouTube -  Do Right Woman Do Right Man.mp3";

// Get file info
router.post('/read', (req: Request, res: Response) => {
    const fileLoc = req.body.fileLoc;
    let tags: MP3TagModel = NodeID3.read(fileLoc)
    NodeID3.read(fileLoc, function(err: Error, tags: any) {
        console.log(tags);
        console.log(typeof(tags));
        res.send({tags: tags});
    })
});

router.post('/write', (req: Request, res: Response) => {
    let img = req.body.tag.APIC;
    let tempFile = 'temp';
    if (img) { tempFile += path.extname(img);}
});

const setMP3Tag = (tag: MP3TagModel, fileLoc: string) => {
    let success = NodeID3.update(tag, fileLoc);
    return success;
};


const downloadImage = function(uri: any, filename: any){
    request.head(uri, function(err: Error, res: reqRes, body: any){
        if (err) {
            console.log(err);
            return { error: err };
        } else {
            request(uri).pipe(fs.createWriteStream(filename))
                .then(() => {return});
        }
    });

};

module.exports = router;
