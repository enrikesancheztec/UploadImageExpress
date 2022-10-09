const dataService = require('../services/data.services');
const {Data} = require('../models/data.models');
const { validationResult } = require('express-validator');
const multer = require('multer');

var storage = multer.memoryStorage();

var upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 }, // 100 Kb
    fileFilter: async function (req, file, cb) {
        let filetypes = /png/;
        let mimetype = filetypes.test(file.mimetype);
        if (mimetype) {
            return cb(null, true);
        }
        cb(new Error('Image Type must be PNG'))
    }
}).single('image');

exports.post = function (req, res) {
    upload(req, res, async function (err) {
        if (err) {
            res.status(400).json({ success: false, error: err.message });
        } else {
            let result = validationResult(req);

            if (result.errors.length > 0) {
                res.status(400).json({ success: false, error: result });
            } else {
                console.log(req.file.size);
                var imageBytes = req.file.buffer;
                let insertedData = await dataService.add(new Data(req.body.id, imageBytes));
                res.status(201).json(insertedData);               
            }   
        }         
    }); 
};

exports.get = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let id = req.params.id;
        let foundData = await dataService.find(id);

        if (foundData != undefined) {
            res.status(200).json(foundData);
        } else {
            res.status(204).json({ success: false, error: "Record not found" });
        }
    }    
};

exports.getImage = async function (req, res) {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        res.status(400).json({ success: false, error: result });
    } else {
        let id = req.params.id;
        let foundData = await dataService.find(id);

        if (foundData != undefined) {
            var img = Buffer.from(foundData.image, 'base64');

            res.writeHead(200, {
              'Content-Type': 'image/png',
              'Content-Length': img.length
            });
            res.end(img);
        } else {
            res.status(204).json({ success: false, error: "Record not found" });
        }
    }    
};