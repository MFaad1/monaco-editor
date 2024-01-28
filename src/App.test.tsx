import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import EventEmitter from "eventemitter3";
import emitter from './emitter';



test('renders learn react link', () => {
  render(<App emitter={emitter} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
