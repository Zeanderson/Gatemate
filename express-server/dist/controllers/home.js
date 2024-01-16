"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homeRouter = (0, express_1.Router)();
homeRouter.get('/hello', (req, res) => {
    res.send('Hello World!');
});
exports.default = homeRouter;
