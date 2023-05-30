import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import { deleteEvent, joinEvent, leaveEvent } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

const EventCard = ({
  id,
  game, //
  description,
  date,
  time,
  organizer,
  onUpdate,
  joined,

}) => {
  const router = useRouter();
  const { user } = useAuth();
  const deletethisEvent = () => {
    if (window.confirm('Delete your Event?')) {
      deleteEvent(id).then(() => onUpdate());
    }
  };
  const leave = () => leaveEvent(id, user.uid).then(() => onUpdate());
  const join = () => joinEvent(id, user.uid).then(() => onUpdate());
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
    {
        joined
          ? <Button className="btn-danger" onClick={leave}>Leave</Button>
          : <Button className="btn-success" onClick={join}>Join</Button>
      }
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
  joined: PropTypes.bool.isRequired,
};

export default EventCard;
