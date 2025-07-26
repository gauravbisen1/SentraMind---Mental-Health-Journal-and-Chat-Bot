const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        user: Joi.string().required(),
        text: Joi.string().required(),
        sentiment: Joi.string().required(),
        date: Joi.string().required(), 
    }).required()
});

