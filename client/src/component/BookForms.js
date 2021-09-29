import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form, FormControl, FormGroup } from "react-bootstrap";
import { addSingleBook } from "../graphql-client/mutation";
import { getAuthors, getBooks } from "../graphql-client/queries";

const BookForms = () => {
  const [newBook, setNewBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const { name, genre, authorId } = newBook;

  const onInputChange = (event) => {
    setNewBook({
      ...newBook,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooks }],
    });

    setNewBook({
      name: "",
      genre: "",
      authorId: "",
    });
    console.log(dataMutation);
  };

  //GraphQL Operation
  const { loading, error, data } = useQuery(getAuthors);

  const [addBook, dataMutation] = useMutation(addSingleBook);

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <FormControl
          type="text"
          placeholder="Book name"
          name="name"
          onChange={onInputChange}
          value={name}
        />
      </FormGroup>
      <FormGroup>
        <FormControl
          type="text"
          placeholder="Book genre"
          name="genre"
          onChange={onInputChange}
          value={genre}
        />
      </FormGroup>
      <FormGroup>
        {loading ? (
          <p>Loading authors...</p>
        ) : (
          <FormControl
            as="select"
            name="authorId"
            onChange={onInputChange}
            value={authorId}
          >
            <option value="" disabled>
              Select author
            </option>
            {data.authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </FormControl>
        )}
      </FormGroup>
      <Button className="float-right" variant="info" type="submit">
        Add Book
      </Button>
    </Form>
  );
};

export default BookForms;
