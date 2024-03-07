"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// categoryController.test.ts
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const app_1 = __importDefault(require("../app")); // Assuming this is your Fastify server instance
const expect = chai_1.default.expect;
chai_1.default.use(chai_http_1.default);
describe('CategoryController', () => {
    beforeEach(async () => {
        // Add any setup logic if needed before each test
        // For example, you might want to clear the database or set up test data
        // This depends on your application and testing strategy
    });
    afterEach(async () => {
        // Add any teardown logic if needed after each test
    });
    describe('createCategory', () => {
        it('should create a new category', async () => {
            const categoryData = {
                latitude: 123,
                longitude: 456,
                category: 'Test',
                counter: 1,
            };
            // Use chai-http to send a POST request to the createCategory endpoint
            const response = await chai_1.default
                .request(app_1.default)
                .post('/create')
                .send(categoryData);
            // Assertions based on the response
            expect(response).to.have.status(201);
            expect(response.body).to.be.an('object');
            expect(response.body.success).to.equal(true);
            expect(response.body.message).to.equal('Category Created Successfully!');
            expect(response.body.body).to.have.property('id');
            // You can add more assertions based on your actual response structure
        });
        // Add more test cases for edge cases and validation if needed
    });
    // Add more describe blocks for other methods in CategoryController
});
