import React from 'react';

/* eslint-disable react/jsx-one-expression-per-line */
export const CalendarEventBox = ({ event }) => {
  const { title, user } = event;
  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  );
};
