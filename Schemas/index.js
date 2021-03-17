const Joi = require("joi");

const registrationSchema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(10).max(100).error(new Error
    ("La contraseña es muy corta,debe tener mas de 10 caracteres y menos de 100")),
});

const newEntrySchema = Joi.object().keys({
    place: Joi.string().required().max(100),
    description: Joi.string(),
});

module.exports = { 
    registrationSchema, 
    newEntrySchema,
};