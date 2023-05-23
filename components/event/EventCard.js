import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const EventCard = ({
  game, //
  description,
  date,
  time,
  organizer,

}) => (
  <Card className="text-center">
    <Card.Header>{game.title}</Card.Header>
    <Card.Body>
      <Card.Title>By: {organizer.bio}</Card.Title>
      <Card.Text>{description}</Card.Text>
      <Card.Text>{date}</Card.Text>
      <Card.Text>{time}</Card.Text>
    </Card.Body>
  </Card>
);

GameCard.propTypes = {
   game: PropTypes.object.isRequired,
  maker: PropTypes.string.isRequired,
  date: PropTypes.date.isRequired,
  time: PropTypes.time.isRequired,
};

export default EventCard;
