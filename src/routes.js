const Boom = require("@hapi/boom");
const Joi = require("joi");

const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} = require("./handler");

const failAction = (request, h, err) => {
  const error = Boom.badRequest(err);
  error.output.payload.status = "fail";
  throw error;
};

const addSchema = Joi.object({
  name: Joi.string()
    .required()
    .error(new Error("Gagal menambahkan buku. Mohon isi nama buku")),
  year: Joi.number().required(),
  author: Joi.string().required(),
  summary: Joi.string().required(),
  publisher: Joi.string().required(),
  pageCount: Joi.number().required(),
  readPage: Joi.number()
    .max(Joi.ref("pageCount"))
    .required()
    .error(
      new Error(
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      ),
    ),
  summary: Joi.string().required(),
  reading: Joi.boolean().required(),
});

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
    options: {
      validate: {
        payload: addSchema,
        failAction,
      },
    },
  },
];

module.exports = routes;
