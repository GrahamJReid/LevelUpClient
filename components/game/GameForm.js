import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes } from '../../utils/data/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameType: 0,
};

const GameForm = ({ user }) => {
  const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGameTypes().then(setGameTypes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.warn(currentGame);
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const game = {
      maker: currentGame.maker,
      title: currentGame.title,
      numberOfPlayers: Number(currentGame.numberOfPlayers),
      skillLevel: Number(currentGame.skillLevel),
      gameType: Number(currentGame.gameType),
      userId: user.uid,
    };

    // Send POST request to your API
    createGame(game).then(() => router.push('/games'));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">

          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />

          <Form.Label>Maker</Form.Label>
          <Form.Control
            type="text"
            style={{ height: '100px' }}
            name="maker"
            value={currentGame.maker}
            onChange={handleChange}
            required
          />
          <Form.Label>Number of Players</Form.Label>
          <Form.Control
            type="text"
            style={{ height: '100px' }}
            name="numberOfPlayers"
            value={currentGame.numberOfPlayers}
            onChange={handleChange}
            required
          />
          <Form.Label>Skill Level</Form.Label>
          <Form.Control
            type="text"
            style={{ height: '100px' }}
            name="skillLevel"
            value={currentGame.skillLevel}
            onChange={handleChange}
            required
          />

          <Form.Label>Game Type</Form.Label>
          <Form.Select
            aria-label="gameType"
            name="gameType"
            onChange={handleChange}
            value={currentGame.gameType}
          >
            <option value="">Select a GameType</option>
            {
                  gameTypes.map((type) => (
                    <option
                      key={type.id}
                      value={type.id}
                    >
                      {type.label}
                    </option>
                  ))
                }
          </Form.Select>

        </Form.Group>
        {/* TODO: create the rest of the input fields */}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default GameForm;
