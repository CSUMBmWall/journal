import {Request, Response} from "express";

const express = require('express');
const router = express.Router();
var youTubeDLService = require('youtube-dl');


router.post('/', (req: Request, res: Response, next: any) => {

    const folder = req.body.fileLoc;
    const ytVideoInfo = req.body.ytVideoInfo;
    const url = ytVideoInfo.url;
    const fileName = ytVideoInfo.artist + ' - ' + ytVideoInfo.album + ' - ' + ytVideoInfo.title;
    const outPutFileName = folder + fileName;

    youTubeDLService.exec(url, ['-x', '--audio-format', 'mp3', '-o', outPutFileName + '.%(ext)s'], {}, function exec(err: any, output: any) {
        'use strict';
        if (err) { throw err; }
        var re = '[ffmpeg] Destination:';
        output = output.filter((x: any) => { return x.includes(re) });
        if (output[0]) {
            res.send({fileLoc: output[0].replace(re, '').trim()});
        }
        else { res.send({ error: "Location not Found"}); }
    });

});

module.exports = router;
