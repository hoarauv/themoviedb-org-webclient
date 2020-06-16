import React from 'react';
import propTypes from 'prop-types';
import {Modal, Spinner, ListGroup, ListGroupItem, Container, Row, Col, Image}
  from 'react-bootstrap';
import BottomScrollListener from 'react-bottom-scroll-listener';
import Description from 'components/Description/Description';

const movieRow = (propArray, openModal) =>
  (propArray.map((prop, index) => (
    <ListGroupItem key={ index } onClick={ prop.handleClick }>
      <Container>
        <Row className="align-items-center">
          <Col md="3" xs="12">
            <h4>
              {prop.data.title}
            </h4>
          </Col>
          <Col md="6" xs={ {order: 'last'} }>
            {
              (prop.data.overview.length > 200) ?
                prop.data.overview.substring(0, 197) + '...' :
                prop.data.overview
            }
          </Col>
          <Col md={ {order: 'last'} } xs='12'>
            <Image
              alt={ `${prop.data.title}_illustration` }
              fluid
              rounded
              src={ prop.data.picture }
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
    onHide={ props.handleCloseModal }
    scrollable
    show={ 'movieOnModal' in props && props.movieOnModal !== undefined }
    size='lg'
    style={ {
      marginLeft: '50%',
      transform: 'translate(-50%,0)',
    } }
  >
    <Modal.Header closeButton>
    </Modal.Header>
    <Modal.Body style={ {
      minHeight: '80vh',
      width: '100%',
      paddingLeft: '1vmin',
      paddingRight: '1vmin',
      overflowX: '',
    } }
    >
      {/* {
        ('movieOnModal' in props && props.movieOnModal !== undefined) ?
          <embed
            src={ `/${props.movieOnModal}/description` }
            style={ {
              position: 'absolute',
              border: 'none',
              display: 'block',
              width: '100%',
              height: '100%',
            } }
            title={ props.movieOnModal }
            type=""
          /> :
          <></>
      } */}
      <Description embed>{props.movieOnModal}</Description>
    </Modal.Body>
  </Modal>
);

MovieModal.propTypes = {
  handleCloseModal: propTypes.func.isRequired,
  movieOnModal: propTypes.number,
};

export const App = (props, endOfListCallBack) => (
  <BottomScrollListener onBottom={ endOfListCallBack }>
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
            handleCloseModal={ props.movieModalClose }
            movieOnModal={ props.movieOnModal }
          />
        </Col>
      </Row>
    </Container>
  </BottomScrollListener>
);

App.propTypes = {
  currentList: propTypes.array.isRequired,
  computing: propTypes.bool.isRequired,
  movieOnModal: propTypes.number.isRequired,
  movieModalOpen: propTypes.func.isRequired,
  movieModalClose: propTypes.func.isRequired,
};
