import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form, FormControl, FormGroup } from "react-bootstrap";
import { addSingleAuthor } from "../graphql-client/mutation";
import { getAuthors } from "../graphql-client/queries";

const AuthorForms = () => {
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    age: "",
  });

  const { name, age } = newAuthor;

  const onInputChange = (event) => {
    setNewAuthor({
      ...newAuthor,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    addAuthor({
      variables: {
        name,
        age: parseInt(age),
      },
      refetchQueries: [{ query: getAuthors }],
    });

    setNewAuthor({
      name: "",
      age: "",
    });
    console.log(dataMutation);
  };

  //GraphQL Operation
  const [addAuthor, dataMutation] = useMutation(addSingleAuthor);

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup className="invisible">
        <FormControl />
      </FormGroup>
      <FormGroup>
        <FormControl
          type="text"
          placeholder="Author name"
          name="name"
          onChange={onInputChange}
          value={name}
        />
      </FormGroup>
      <FormGroup>
        <FormControl
          type="number"
          placeholder="Author age"
          name="age"
          onChange={onInputChange}
          value={age}
        />
      </FormGroup>

      <Button className="float-right" variant="info" type="submit">
        Add Author
      </Button>
    </Form>
  );
};

export default AuthorForms;
