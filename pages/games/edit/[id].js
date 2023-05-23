/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import GameForm from '../../../components/game/GameForm';
import { getSingleGame } from '../../../utils/data/gameData';

export default function EditGamePage() {
  const router = useRouter();
  const { id } = router.query;

  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getSingleGame(id).then((obj) => {
      obj.numberOfPlayers = obj.number_of_players;
      obj.skillLevel = obj.skill_level;
      obj.gameType = obj.game_type;
      setEditItem(obj);
    });
  }, [id]);
  return (
    <>
      <Head>
        <title>Edit Image</title>
      </Head>
      <div>
            <GameForm obj={editItem} />
      </div>

    </>
  );
}
