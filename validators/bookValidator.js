import Joi from 'joi';

const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
});

export { createBookSchema };
