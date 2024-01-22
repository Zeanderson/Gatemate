"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const weather_1 = tslib_1.__importDefault(require("./controllers/weather"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
//TODO Needs to be in ENV file
const PORT = 4001;
const app = (0, express_1.default)();
// Middleware goes here -- IF it does not go above routes it will not work ;)
app.use(express_1.default.json());
//TODO app.use('/api/v1/login', loginController);
//TODO app.use('/api/v1/signup', signupController);
app.use('/api/v1/home', weather_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
