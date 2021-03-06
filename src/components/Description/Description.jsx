import React from 'react';
import {Card, Container, Col, Row, ProgressBar, Image}
  from 'react-bootstrap';
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

const DescriptionCardSurveyAndDuration = (props) => (
  <Row style={ props.style }>
    <Col md='6' xs='12'>
      <p><b>Run time:</b> {props.duration} minutes</p>
    </Col>
    <Col md='6' xs='12'>
      <Row>
        <Col md='12' xs='12'>
          <ProgressBar now={ props.note * 10 } />
          <p>
            <b>{props.note * 10}%</b> of satisfaction over {
              props.nbVotes} votes
          </p>
        </Col>
      </Row>
    </Col>
  </Row>

);

DescriptionCardSurveyAndDuration.propTypes = {
  style: propTypes.object,
  note: propTypes.number.isRequired,
  nbVotes: propTypes.number.isRequired,
  duration: propTypes.number.isRequired,
};

const GenreListCol = (props) => ((
  props.genres === undefined ||
  props.genres.length === 0
) ?
  <></> :
  <Col><p><b>Genres: </b>{props.genres.join(', ')}</p></Col>
);

GenreListCol.propTypes = {
  genres: propTypes.array.isRequired,
};

const SpokenLanguagesCol = (props) => ((
  props.spokenLanguages === undefined ||
  props.spokenLanguages.length === 0
) ?
  <></> :
  <Col>
    <p><b>Spoken Languages: </b>{props.spokenLanguages.join(', ')}</p>
  </Col>
);

SpokenLanguagesCol.propTypes = {
  spokenLanguages: propTypes.array.isRequired,
};

const DescriptionCardMetaInfo = (props) => (
  <>
    <Row>
      <GenreListCol genres={ props.genres } />
      <SpokenLanguagesCol spokenLanguages={ props.spokenLanguages } />
    </Row>
    {
      (props.releaseDate !== undefined && props.releaseDate !== null) ? (
        <Row><Col>
          <p><b>Release Date: </b>{props.releaseDate}</p>
        </Col></Row>
      ) : <></>
    }
    {
      (props.oTitle !== undefined) ?
        <Row><Col>
          <b>Original Title: </b>{props.oTitle}
        </Col></Row> :
        <></>
    }
    {
      (
        props.homepage !== undefined &&
        props.homepage !== null &&
        props.homepage !== ''
      ) ?
        <Row><Col>
          <p>
            <b>More info: </b><a href={ props.homepage }>{props.homepage}</a>
          </p>
        </Col></Row> :
        <></>
    }

  </>
);

DescriptionCardMetaInfo.propTypes = {
  oTitle: propTypes.string.isRequired,
  genres: propTypes.array.isRequired,
  homepage: propTypes.string.isRequired,
  spokenLanguages: propTypes.array.isRequired,
  releaseDate: propTypes.string.isRequired,
};

const listToListOfChuncks = (list, nbPerChunk) => {
  let i = 0;
  const result = [];
  while (i < list.length) {
    result.push(list.slice(i, i + nbPerChunk));
    i += nbPerChunk;
  }
  return (result);
};

const DescriptionCardProductors = (props) => (
  <>
    <Row>
      <Col>
        <p style={ {marginBottom: '0', marginTop: '1vh'} }>
          <b>Productors: </b>
        </p>
      </Col>
    </Row>
    {listToListOfChuncks(props.production, 3).map((rowList, rowIndex) => (
      <Row className='align-items-center' key={ rowIndex }>
        {
          rowList.map((item, itemIndex) => (
            <Col
              key={ itemIndex }
              md={ 12 / rowList.length }
              xs={ 12 }
            >
              <Image
                alt={ item.name }
                src={ item.picture }
                style={ {
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'block',
                  maxHeight: '10vmin',
                  maxWidth: '15vmin',
                  textAlign: 'center',
                } }
              />
              <p style={ {
                textAlign: 'center',
              } }
              >
                {item.name}
              </p>
            </Col>
          ))
        }
      </Row>
    ))}
  </>
);

DescriptionCardProductors.propTypes = {
  production: propTypes.array.isRequired,
};

const DescriptionCardBody = (props) => (
  <Card.Body>
    <Container>
      <DescriptionCardTitle
        adult={ props.adult } style={ {
          marginBottom: '1.5vh',
        } } title={ props.title }
      />
      <DescriptionCardSurveyAndDuration
        duration={ props.duration }
        nbVotes={ props.votes.count }
        note={ props.votes.note }
      />
      <Row><Col><p>{props.description}</p></Col></Row>
      <DescriptionCardMetaInfo
        genres={ props.genres }
        homepage={ props.homepage }
        oTitle={ props.oTitle }
        prod={ props.productions }
        releaseDate={ props.releaseDate }
        spokenLanguages={ props.spokenLanguages }
      />
      <DescriptionCardProductors production={ props.productions } />
    </Container>
  </Card.Body>
);

DescriptionCardBody.propTypes = {
  adult: propTypes.bool.isRequired,
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  votes: propTypes.object.isRequired,
  oTitle: propTypes.string.isRequired,
  spokenLanguages: propTypes.array.isRequired,
  homepage: propTypes.string.isRequired,
  duration: propTypes.number.isRequired,
  productions: propTypes.array.isRequired,
  genres: propTypes.array.isRequired,
  releaseDate: propTypes.string.isRequired,
};

/**
 * Represents the actual content of a loaded description page
 * @param {object} props - The props of DescriptionLoaded
 * @return {ReactNode} - The react node of the descriptoin page to be displayed
 */
function DescriptionLoaded(props) {
  const isFramed = window.location !== window.parent.location;
  return (
    <Container
      style={ {
        width: '100%',
      } }
    >
      <Row>
        <Col>
          <Card
            style={ {
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'block',
              minWidth: '300px',
              height: '100%',
              width: (isFramed) ?
                '100%' :
                '75%',
            } }
          >
            <DescriptionCardPicture src={ props.picture } />
            <DescriptionCardBody
              adult={ props.isAdult }
              description={ props.description }
              duration={ props.runTime }
              genres={ props.genres }
              homepage={ props.homepage }
              oTitle={ props.oTitle }
              productions={ props.productions }
              releaseDate={ props.releaseDate }
              spokenLanguages={ props.spokenLanguages }
              title={ props.title }
              votes={ props.votes }
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

DescriptionLoaded.propTypes = {
  isAdult: propTypes.bool.isRequired,
  description: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  votes: propTypes.object.isRequired,
  picture: propTypes.string.isRequired,
  oTitle: propTypes.string.isRequired,
  spokenLanguages: propTypes.array.isRequired,
  homepage: propTypes.string.isRequired,
  runTime: propTypes.number.isRequired,
  productions: propTypes.array.isRequired,
  genres: propTypes.array.isRequired,
  releaseDate: propTypes.string.isRequired,
};

const LoadingDescription = () => (
  <div>loading</div>
);

const UnreachableDescription = () => (
  <div>unreachable</div>
);

/**
 * Full description page of a movie
 * @param {object} props - The props of the ReactNode
 * @return {ReactNode} - The react node to be displayed
 */
export function Description(props) {
  if (props.computing === true) {
    return <LoadingDescription />;
  }
  if (props.cantAccessDescription === true) {
    return <UnreachableDescription />;
  }
  return <DescriptionLoaded { ...props } />;
}

Description.propTypes = {
  computing: propTypes.bool.isRequired,
  cantAccessDescription: propTypes.bool.isRequired,
};
