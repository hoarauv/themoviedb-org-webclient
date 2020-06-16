import React from 'react';
import {Card, Container, Row, Col, Button} from 'react-bootstrap';

const InvalidPath = () => (
  <Container style={ {marginTop: '8vh'} }>
    <Row>
      <Col>
        <Card>
          <Card.Img
            alt="Invalid Url" src="/lost.png" style={ {
              maxWidth: '200px',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            } }
            variant='top'
          />
          <Card.Title style={ {textAlign: 'center'} }>
            Are you lost ?
          </Card.Title>
          <Card.Body>
            <Container>
              <Row>
                <Col>
                  <p style={ {textAlign: 'center'} }><b>
                    Here is a quick way out of this place
                  </b></p>
                  <Button
                    href='/home' style={ {
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    } }
                  >
                    See you, space cowboy...
                  </Button>
                </Col>
              </Row>
            </Container>

          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default InvalidPath;
