import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import EventCard from '../../components/event/EventCard';
import { getEvents } from '../../utils/data/eventData';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);
  const displayEvents = () => {
    getEvents().then((data) => setEvents(data));
  };

  return (
    <><article className="events">
      <h1>Events</h1>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard id={event.id} game={event.game.title} description={event.description} date={event.date} time={event.time} organizer={event.organizer} onUpdate={displayEvents} />
        </section>
      ))}
      </article>
    <Button
      onClick={() => {
        router.push('/events/new');
      }}
    >
  Create Event
    </Button>
    </>

  );
}

export default Home;
