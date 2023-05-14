import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

export const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

// TODO: agregar interceptores

// En el archivo de barril hay que agregar el "default as calendarApi"
// porque es una exportación por defecto.
export default calendarApi;
