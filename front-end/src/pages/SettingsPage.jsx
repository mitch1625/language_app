import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const SettingsPage = () => {
    return (
    <>
    <Container>
      <Row>
        <Col>
          <Link to="update-email/">Update Email</Link>
        </Col>
        <Col>Change Password</Col>
        <Col>IDK YET</Col>
      </Row>
    </Container>
    </>
    )
}

export default SettingsPage