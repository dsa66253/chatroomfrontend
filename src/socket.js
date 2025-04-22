import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const BACKENDPORT = 4000
const URL = process.env.NODE_ENV === 'production' ? undefined : `http://localhost:${BACKENDPORT}`;

export const socket = io(URL);