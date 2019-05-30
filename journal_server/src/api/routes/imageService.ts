import {Request, Response} from "express";

const express = require('express');
const router = express.Router();

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

router.get('/', ( req: any, res: Response, next: any) => {
    const response = client.search({
        index: 'journal',
        type: 'journal_entry',
        body: {
            "query": {
                "bool": {
                    "must": {
                        "exists": {
                            "field": "img"
                        }
                    }
                }
            }
        }
    }).then((searchResponse: any) => {
        var images: any = [];
        for (const hit of searchResponse.hits.hits) {
            for (const pic of hit._source.img) {
                images.push(pic);
            }
        }
        res.send(images);
    });
});

module.exports = router;

