import React from "react";
import { Col, Row } from "react-bootstrap";
import AuthorForms from "./AuthorForms";
import BookForms from "./BookForms";

const Forms = () => {
  return (
    <Row>
      <Col>
        <BookForms />
      </Col>
      <Col>
        <AuthorForms />
      </Col>
    </Row>
  );
};

export default Forms;
