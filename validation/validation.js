// Validation
// ---------------------------------

import Joi from 'joi';

export function weatherDataValidation(data) {
    const weatherSchema = Joi.object({
        token: Joi.string().required(),
        temp: Joi.number().required(),
        hum: Joi.number().required(),
        pres: Joi.number().required(),
    });

    const { error, value } = weatherSchema.validate(data);

    if (error) {
        console.log(`Validation error: ${error.details.map((x) => x.message).join(', ')}`);
        return error;
    } else {
        return;
    }
}
