import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import { deleteEvent } from '../../utils/data/eventData';

const EventCard = ({
  id,
  game, //
  description,
  date,
  time,
  organizer,
  onUpdate,

}) => {
  const router = useRouter();
  const deletethisEvent = () => {
    if (window.confirm('Delete your Event?')) {
      deleteEvent(id).then(() => onUpdate());
    }
  };
  return (
  <Card className="text-center">
    <Card.Body>
      <Card.Title>By: {organizer.bio}</Card.Title>
      <Card.Text>{game}</Card.Text>
      <Card.Text>{description}</Card.Text>
      <Card.Text>{date}</Card.Text>
      <Card.Text>{time}</Card.Text>
    </Card.Body>
    <Button
      onClick={() => {
        router.push(`/events/edit/${id}`);
      }}
    >
  Edit Event
    </Button>
    <Button
      onClick={deletethisEvent}
    >
       Delete
    </Button>
  </Card>

  );
};
EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  game: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  organizer: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
