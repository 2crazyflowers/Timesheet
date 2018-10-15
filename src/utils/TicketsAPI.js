import axios from 'axios';

export default {
  // Gets all tickets
  getTimeEntries() {
    return axios.get('/api/tickets');
  },
  // Saves a ticket to the database
  saveTicket(ticketData) {
    return axios.post('/api/tickets', ticketData);
  },
  // get a specific ticket's id
  getTicket(id) {
    return axios.get(`/api/tickets/${id}`);
  },
  // Deletes the ticket with the given id
  deleteTicket(id) {
    return axios.delete(`/api/tickets/${id}`);
  },
  // update a ticket in the database
  updateTicket(id) {
    return axios.put(`/api/tickets/${id}`);
  },
};
