'use strict';

require('dotenv').config();

const cors = require('cors');

const express = require('express');
const app = express();

app.use(cors());

const PORT = process.env.PORT;

app.listen(PORT, () => console.log('I am alive!'));
