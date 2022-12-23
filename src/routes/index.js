const express = require('express');
const router = require('router');
const apiV1Routes = require('./v1/index');


router.use('/v1',apiV1Routes);