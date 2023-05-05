const Joi = require("joi");

const bodySchema = Joi.object({
  name: Joi.string().alphanum().min(3).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  phone: Joi.string().required(),
});

const bodySchemaUpdate = Joi.object({
  name: Joi.string().alphanum().min(3),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string(),
});

module.exports = {
  bodySchema,
  bodySchemaUpdate,
};
