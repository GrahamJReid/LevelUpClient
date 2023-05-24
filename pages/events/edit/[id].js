/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import EventForm from '../../../components/event/EventForm';
import { getSingleEvent } from '../../../utils/data/eventData';

export default function EditEventPage() {
  const router = useRouter();
  const { id } = router.query;

  const [editItem, setEditItem] = useState({});

  useEffect(() => {
    getSingleEvent(id).then((obj) => {
      setEditItem(obj);
    });
  }, [id]);
  return (
    <>
      <Head>
        <title>Edit Event</title>
      </Head>
      <div>
            <EventForm obj={editItem} />
      </div>

    </>
  );
}
