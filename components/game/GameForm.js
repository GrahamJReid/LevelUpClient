import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes, updateGame } from '../../utils/data/gameData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameType: 0,
};

const GameForm = ({ obj }) => {
  const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setCurrentGame({
        id: obj.id,
        maker: obj.maker,
        title: obj.title,
        numberOfPlayers: Number(obj.numberOfPlayers),
        skillLevel: Number(obj.skillLevel),
        gameType: Number(obj.gameType.id),
        userId: user.uid,
      });
    }
  }, [obj, user]);

  useEffect(() => {
    getGameTypes().then(setGameTypes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    if (obj.id) {
      const gameUpdate = {
        id: obj.id,
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: Number(currentGame.numberOfPlayers),
        skillLevel: Number(currentGame.skillLevel),
        gameType: Number(currentGame.gameType),
        userId: user.uid,
      };
      updateGame(gameUpdate)
        .then(() => router.push('/games'));
    } else {
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
    }
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
  obj: PropTypes.shape({
    id: PropTypes.number,
    skillLevel: PropTypes.number,
    numberOfPlayers: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    gameType: PropTypes.object,
  }),
};

GameForm.defaultProps = {
  obj: initialState,
};

export default GameForm;
