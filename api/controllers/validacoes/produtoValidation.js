const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);

const ProdutoValidation = {
    store: {
        body: {
            titulo: Joi.string().required(),
            descricao: Joi.string().required(),
            categoria: Joi.string().alphanum().length(24).required(),
            descricao: Joi.number().required(),
            promocao: Joi.number(),
            sku: Joi.string().required()
        }
    },
    update: {
        params: {
            id: Joi.string().alphanum().length(24).required(),
        },
        body: {
            titulo: Joi.string().optional(),
            descricao: Joi.string().optional(),
            categoria: Joi.string().alphanum().length(24).optional(),
            descricao: Joi.number().optional(),
            promocao: Joi.number(),
            sku: Joi.string().optional(),
            disponibilidade: Joi.boolean().optional()
        }
    },
    updateImages: {
        params: {
            id: Joi.string().alphanum().length(24).required(),
        }
    },
    remove: {
        params: {
            id: Joi.string().alphanum().length(24).required(),
        }
    },
    index: {
        query: {
            loja: Joi.string().alphanum().length(24).required(),
            limit: Joi.number(),
            offset: Joi.number(),
            sortType: Joi.string(),
        }
    },
    indexDisponiveis: {
        query: {
            loja: Joi.string().alphanum().length(24).required(),
            limit: Joi.number(),
            offset: Joi.number(),
            sortType: Joi.string(),
        }
    },
    search: {
        params: {
            search: Joi.string().required(),
        },
        query: {
            loja: Joi.string().alphanum().length(24).required(),
            limit: Joi.number(),
            offset: Joi.number(),
            sortType: Joi.string(),
        }
    },
    show: {
        params: {
            search: Joi.string().alphanum().length(24).required(),
        }
    }
};

module.exports = { ProdutoValidation };