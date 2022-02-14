import axios from 'axios';
import { API } from '../protocols/api';

const instance = axios.create();

export default instance as API;
