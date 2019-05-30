import {Request, Response} from "express";

const express = require('express');
const router = express.Router();

const NodeID3 = require('node-id3');

var request = require('request').defaults({ encoding: null });

import {MP3TagModel} from "../models/MP3Tag.model";
import {async} from "rxjs/internal/scheduler/async";

router.post('/read', (req: Request, res: Response) =>{
    console.log('fileLoc ' + req.body.fileLoc);
    const fileLoc = req.body.fileLoc;
    let tags = NodeID3.read(fileLoc)
    NodeID3.read(fileLoc, function(err: any, tags: any) {
        res.send({tags: tags});
    })

});

router.post('/write', (req: Request, res: Response) =>{
    let msg = writeTags(req);
    console.log("msg" + JSON.stringify(msg));
    res.send({msg: msg});
});

async function writeTags(req: Request) {
    const fileLoc = req.body.fileLoc;

    let tags = new MP3TagModel();
    tags.convertFromJSON(req.body.tags);


    await request.get(tags.APIC, function (err:any, res: any, body: any) {
        //process exif here
        if (!err && res.statusCode == 200) {
        }
        tags.APIC = body;
        tags.raw.APIC = body;
    });

    let success = await NodeID3.write(tags, fileLoc);
    console.log('success' + success);
    return {'success': success};
}

module.exports = router;
