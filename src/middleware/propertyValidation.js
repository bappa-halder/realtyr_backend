export const validateProperty = (schema) => async (req, res, next) => {
  try {
    const parsedBody = {
      ...req.body,
      price: req.body.price ? Number(req.body.price) : undefined,
      bedroom: req.body.bedroom ? Number(req.body.bedroom) : undefined,
      bathroom: req.body.bathroom ? Number(req.body.bathroom) : undefined,
      area: req.body.area ? Number(req.body.area) : undefined,
    };

    await schema.validate(parsedBody, {
      abortEarly: false,
    });

    req.body = parsedBody; 
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      errors: err.errors,
    });
  }
};
