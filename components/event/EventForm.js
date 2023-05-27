import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getGames } from '../../utils/data/gameData';
import { createEvent, updateEvent } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  game: '',
  description: '',
  date: '',
  time: '',
  organizer: '',
};
const EventForm = ({ obj }) => {
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentEvent, setcurrentEvent] = useState(initialState);
  const router = useRouter();
  const [games, setGames] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setcurrentEvent({
        id: obj.id,
        game: obj.game.id,
        description: obj.description,
        date: obj.date,
        time: obj.time,
        organizer: obj.organizer,
        userId: user.uid,
      });
    }
  }, [obj, user]);

  useEffect(() => {
    getGames().then(setGames);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.warn(currentEvent);
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    if (obj.id) {
      const eventUpdate = {
        id: obj.id,
        game: currentEvent.game,
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        userId: user.uid,
      };
      updateEvent(eventUpdate)
        .then(() => router.push('/events'));
    } else {
      const event = {
        game: currentEvent.game,
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        userId: user.uid,
      };

      // Send POST request to your API
      createEvent(event).then(() => router.push('/events'));
    }
  };

  return (
    <>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">

        <Form.Label>Game</Form.Label>
          <Form.Select
            aria-label="game"
            name="game"
            onChange={handleChange}
            value={currentEvent.game}
          >
            <option value="">Select a Game</option>
            {
                  games.map((game) => (
                    <option
                      key={game.id}
                      value={game.id}
                    >
                      {game.title}
                    </option>
                  ))
                }
          </Form.Select>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            style={{ height: '100px' }}
            name="description"
            value={currentEvent.description}
            onChange={handleChange}
            required
          />
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={currentEvent.date}
            onChange={handleChange}
            required
          />
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            value={currentEvent.time}
            onChange={handleChange}
            required
          />

        </Form.Group>
        {/* TODO: create the rest of the input fields */}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types
    game: PropTypes.object,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    organizer: PropTypes.object,
  }),
};

EventForm.defaultProps = {
  obj: initialState,
};

export default EventForm;
