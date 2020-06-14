import React from 'react';
import {Card, Container, Col, Row, ProgressBar, Image} from 'react-bootstrap';
import propTypes from 'prop-types';

const DescriptionCardPicture = (props) => (
  <Card.Img
    src={ props.src }
    style={ {objectFit: 'cover'} }
    variant="top"
  />
);

DescriptionCardPicture.propTypes = {
  src: propTypes.string.isRequired,
};

const DescriptionCardTitle = (props) => (
  <Row className="align-items-center" style={ props.style }>
    <Col md='10' xs='10'>
      <h4>{props.title}</h4>
    </Col>
    {(props.adult === true) ?
      <Col md='2' xs='2'>
        <Image
          alt='rated 18'
          height='auto'
          src='/r18.png'
          width='100%'
        />
      </Col> :
      <></>}
  </Row>
);

DescriptionCardTitle.propTypes = {
  style: propTypes.object,
  adult: propTypes.bool.isRequired,
  title: propTypes.string.isRequired,
};

const DescriptionCardSurvey = (props) => (
  <Row style={ props.style }>
    <Col md='6' xs='12'>
    </Col>
    <Col md='6' xs='12'>
      <ProgressBar now={ props.note * 10 } />
      <p style={ {textAlign: 'right'} }>
        {props.note * 10}% of satisfaction over {
          props.nbVotes} votes
      </p>
    </Col>
  </Row>

);

DescriptionCardSurvey.propTypes = {
  style: propTypes.object,
  note: propTypes.number.isRequired,
  nbVotes: propTypes.number.isRequired,
};

const DescriptionCardBody = (props) => (
  <Card.Body>
    <Container>
      <DescriptionCardTitle
        adult={ props.adult } style={ {
          marginBottom: '1.5vh',
        } } title={ props.title }
      />
      <DescriptionCardSurvey nbVotes={ props.votes.count } note={ props.votes.note } />
      <Row><Col><p>{props.description}</p></Col></Row>
    </Container>
  </Card.Body>
);

DescriptionCardBody.propsTypes = {
  adult: propTypes.bool.isRequired,
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  votes: {
    count: propTypes.number.isRequired,
    note: propTypes.number.isRequired,
  },
};

export function Description(props) {
  // TODO
  // isFramed will later check if we are in an iframe or in a real page
  // it is important to do so, so we can adapt the propportion of the
  // container/row accordingly
  const isFramed = window.location !== window.parent.location;
  return (
    <Container
      style={ (isFramed) ? {
          width: '100%',
          marginTop: '2vh',
        } : {
          marginTop: '4vh',
        }
      }
    >
      <Row>
        <Col>
          <Card
            style={ {
              minWidth: '300px',
              marginLeft: '50%',
              transform: 'translate(-50%,0)',
              height: '100%',
              width: (isFramed) ?
                '100%' :
                '80%',
            } }
          >
            <DescriptionCardPicture src={ props.picture } />
            <DescriptionCardBody
              adult={ props.isAdult }
              description={ props.description }
              title={ props.title }
              votes={ props.votes }
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

Description.propTypes = {
  isAdult: propTypes.bool.isRequired,
  description: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  votes: propTypes.object.isRequired,
  picture: propTypes.string.isRequired,
};
