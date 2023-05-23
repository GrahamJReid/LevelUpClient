import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getGames } from '../../utils/data/gameData';
import { createEvent } from '../../utils/data/eventData';

const initialState = {
  game: '',
  description: '',
  date: '',
  time: '',
  organizer: '',
};

const EventForm = ({ user }) => {
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentEvent, setcurrentEvent] = useState(initialState);
  const router = useRouter();
  const [games, setGames] = useState([]);

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

    const today = new Date();
    const daytoday = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const timenow = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const event = {
      game: currentEvent.game,
      description: currentEvent.description,
      date: daytoday,
      time: timenow,
      userId: user.uid,
    };

    // Send POST request to your API
    createEvent(event).then(() => router.push('/events'));
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
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventForm;
