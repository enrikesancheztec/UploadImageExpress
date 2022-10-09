const service = require('../services/data.services');
const {Data} = require('../models/data.models');
const fs = require('fs-extra')

describe("Data Service Tests", () => {
    test("DADO una buffer con una imagen valida y un id inicial CUANDO se agregue la imagen ENTONCES se persiste la nueva imagen Y se obtiene su nuevo id", async () => {
        // GIVEN
        let imageData = fs.readFileSync(__dirname + '/resources/thumb-jpg.png');
        let inputData = new Data(0, imageData);

        // WHEN
        let insertedData = await service.add(inputData);

        // THEN
        expect(insertedData.id).toBeGreaterThan(0);
        expect(insertedData.imagen).toBe(imageData);
    });  
})