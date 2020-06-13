import React from 'react';
import propTypes from 'prop-types';
import {Modal, ModalBody, ModalFooter, Spinner, Button, ListGroup, ListGroupItem, Container, Row, Col, Image} from 'react-bootstrap';

const movieRow = (propArray, openModal) =>
  (propArray.map((prop, index) => (
    <ListGroupItem key={ index } onClick={ () => openModal(prop.id) }>
      <Container>
        <Row>
          <Col md="3" xs="12">
            <h4>
              {prop.title}
            </h4>
          </Col>
          <Col md="6" xs={ {order: 'last'} }>
            {prop.overview}
          </Col>
          <Col md={ {order: 'last'} } xs='12'>
            <Image
              alt={ `${prop.title}_illustration` }
              fluid
              rounded
              src={ prop.picture }
            />
          </Col>
        </Row>
      </Container>
    </ListGroupItem>
  )));

movieRow.propTypes = {
  propArray: propTypes.array.isRequired,
  openModal: propTypes.func.isRequired,
};

const NotReady = (props) => (
  (!props.isReady) ?
    <></> :
    <ListGroupItem>
      <div style={ {
        marginLeft: '50%',
        transform: 'translate(-50%,0)',
        width: '50px',
      } }
      >
        <Spinner
          animation="border"
          style={ {
          } }
        />
      </div>
    </ListGroupItem>
);

NotReady.propTypes = {
  isReady: propTypes.bool.isRequired,
};

const MovieModal = (props) => (
  <Modal
    backdrop="static"
    centered
    keyboard
    onHide={ () => {
      props.closeModal();
    } }
    scrollable
    show={ 'movieOnModal' in props && props.movieOnModal !== undefined }
    size='lg'
    style={ {
      marginLeft: '50%',
      transform: 'translate(-50%,0)',
    } }
  >
    <Modal.Header closeButton>
      <Button align='right'>
        Share
      </Button>
    </Modal.Header>
    <Modal.Body style={ {
      minHeight: '80vh',
      width: '100%',
    } }
    >
      {
        ('movieOnModal' in props && props.movieOnModal !== undefined) ?
          <iframe
            src={ `/${props.movieOnModal}/description` }
            style={ {
              border: 'none',
              marginLeft: '46%',
              transform: 'translate(-50%,0)',
              display: 'block',
              width: '90%',
              height: '90%',
              position: 'absolute',
            } }
            type=""
          /> :
          <></>
      }
    </Modal.Body>
  </Modal>
);

MovieModal.propTypes = {
  closeModal: propTypes.func.isRequired,
  movieOnModal: propTypes.number,
};

export const App = (props) => (
  <Container>
    <Row>
      <Col>
        <ListGroup style={ {marginBottom: '15px'} }>
          {movieRow(props.currentList, props.movieModalOpen)}
          <NotReady isReady={ props.computing } />
        </ListGroup>
      </Col>
    </Row>
    <Row>
      <Col>
        <MovieModal
          closeModal={ props.movieModalClose }
          movieOnModal={ props.movieOnModal }
        />
      </Col>
    </Row>
    <script>
      {
        window.scroll(function() {
          if (window.scrollTop() + window.height() == document.height()) {
            alert('bottom!');
          }
        })
      }
    </script>
  </Container>
);

App.propTypes = {
  currentList: propTypes.array.isRequired,
  computing: propTypes.bool.isRequired,
};
