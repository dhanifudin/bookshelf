const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
  const { pageCount, readPage } = request.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    ...request.payload,
    finished,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h
      .response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: { bookId: id },
      })
      .code(201);
    return response;
  }

  const response = h
    .response({
      status: "fail",
      message: "Buku gagal ditambahkan",
    })
    .code(500);
  return response;
};

module.exports = { addBookHandler };
