import React from 'react';
import {Card, Container, Col, Row, ProgressBar, Image} from 'react-bootstrap';

const DescriptionCardPicture = (props) => (
  <Card.Img
    src={ props.src }
    style={ {objectFit: 'cover'} }
    variant="top"
  />
);

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

export function Description(props) {
  const isFramed = false;
  return (
    <Container style={ {
      marginTop: (isFramed) ?
        '' :
        '2.5vh',
    } }
    >
      <Row>
        <Col>
          <Card style={ {
            minWidth: '300px',
            marginLeft: '50%',
            transform: 'translate(-50%,0)',
            height: (isFramed) ?
              '100%' :
              '',
            width: (isFramed) ?
              '100%' :
              '',
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
