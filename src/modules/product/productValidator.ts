const Joi = require('joi');

const schemaAddProduct = Joi.object().keys({
  productName: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  ownerId: Joi.string().required(),
});

const schemaUpdateProduct = Joi.object().keys({
  productId: Joi.string().required(),
  productName: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  ownerId: Joi.string().required(),
});

export function validateStaticProduct(item: any) {
  const { error } = schemaAddProduct.validate(item, { abortEarly: false });
  if (error) {
    throw new Error(error.details.map((detail: { message: any; }) => detail.message).join(', '));
  }
}

export function validateUpdateProduct(item: any) {
  const { error } = schemaUpdateProduct.validate(item, { abortEarly: false });
  if (error) {
    throw new Error(error.details.map((detail: { message: any }) => detail.message).join(', '));
  }
}
