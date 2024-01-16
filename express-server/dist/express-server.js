"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const home_1 = tslib_1.__importDefault(require("./controllers/home"));
//TODO Needs to be in ENV file
const PORT = 3000;
const app = (0, express_1.default)();
// Middleware goes here -- IF it does not go above routes it will not work ;)
app.use(express_1.default.json());
//TODO app.use('/api/v1/login', loginController);
//TODO app.use('/api/v1/signup', signupController);
app.use('/api/v1/home', home_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
