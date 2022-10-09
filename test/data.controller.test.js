const request = require('supertest');
const server = require('../app');
const { Data } = require('../models/data.models');
const service = require('../services/data.services');

describe("Data Endpoint Tests", () => {
    test("DADO un id existente CUANDO se obtiene por id ENTONCES se regresa status 200 Y la informacion de la imagen", async()=>{
        const serviceFindSpy = jest.spyOn(service, 'find');
        serviceFindSpy.mockReturnValue(new Data(1, {}));

        return request(server)
            .get('/data/1')
            .expect(200).expect({ id: 1, imagen: {}});
     });      

     test("DADO un id no existente CUANDO se obtiene por id ENTONCES se regresa status 204", async()=>{
        const serviceFindSpy = jest.spyOn(service, 'find');
        serviceFindSpy.mockReturnValue(undefined);

        return request(server)
            .get('/data/2')
            .expect(204);
     });
     
     test("DADO una imagen JPG CUANDO se agrega ENTONCES se obtiene status 400", async()=>{
        return request(server)
            .post('/data')
            .field("data", JSON.stringify({ id: 0 }))
            .attach("image", __dirname + '/resources/JPEG_example_flower.jpg')
            .set("Content-Type", "multipart/form-data")
            .expect(400);
     });

     test("DADO una imagen PNG que excede el limite de tamaño CUANDO se agrega ENTONCES se obtiene status 400", async()=>{
        return request(server)
            .post('/data')
            .field("data", JSON.stringify({ id: 0 }))
            .attach("image", __dirname + '/resources/Sample-PNG-Image.png')
            .set("Content-Type", "multipart/form-data")
            .expect(400);
     });

     test("DADO una imagen PNG con tamaño valido CUANDO se agrega ENTONCES se obtiene status 201 y un JSON con el nuevo id", async()=>{
        const serviceAddSpy = jest.spyOn(service, 'add');
        serviceAddSpy.mockReturnValue(new Data(1, {}));

        return request(server)
            .post('/data')
            .field("data", JSON.stringify({ id: 0 }))
            .attach("image", __dirname + '/resources/thumb-jpg.png')
            .set("Content-Type", "multipart/form-data")
            .expect(201).expect({ id: 1, imagen: {}});;
     });   
})