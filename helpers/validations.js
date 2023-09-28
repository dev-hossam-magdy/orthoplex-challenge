const joi = require("joi")
const patterns = require("./patterns")
const joiEmail = joi.string().not().empty().email().min(5).max(70).pattern(patterns.email).required()
const joiOptionalEmail = joi.string().allow(null,'').email().min(5).max(70).pattern(patterns.email).required()
const joiName = joi.string().not().empty().trim().normalize().min(3).max(45).pattern(patterns.name).required()
const joiPhone = joi.number().integer().required()
const joiNumber = joi.number().required()
const joiOptionalPhone = joi.number().allow(null,'').integer().required()
const joiId =  joi.string().not().empty().trim().normalize().min(10).max(25).pattern(patterns.numbers).required()
const joiText = (min, max) => joi.string().not().empty().trim().normalize().min(min).max(max).pattern(patterns.text).required()
const joiTextAr = (min, max) => joi.string().not().empty().trim().normalize().min(min).max(max).pattern(patterns.textAr).required()
const joiHtmlText = (min, max) => joi.string().not().empty().trim().normalize().min(min).max(max).required()
const joiNotRequiredText = (min, max) => joi.string().allow(null, '').trim().normalize().min(min).max(max).pattern(patterns.text).not().required()
const joiBoolean =  joi.string().not().empty().trim().normalize().min(1).max(1).pattern(/^[0-1]$/)
const joiTruOrFalseValue =  joi.boolean()

module.exports = {
    joiEmail,
    joiOptionalEmail,
    joiName,
    joiPhone,
    joiOptionalPhone,
    joiId,
    joiHtmlText,
    joiNotRequiredText,
    joiBoolean,
    joiText,
    joiTextAr,
    joiTruOrFalseValue,
    joiNumber
}