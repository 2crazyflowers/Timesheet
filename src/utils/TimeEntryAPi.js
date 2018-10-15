import axios from 'axios';

export default {
  // Gets all time entries
  getTimeEntries() {
    return axios.get('/api/timeentries');
  },
  // Saves a time entry to the database
  saveTimeEntry(timeentryData) {
    return axios.post('/api/timeentries', timeentryData);
  },
  // get a specific time entry's id
  getTimeEntry(id) {
    return axios.get(`/api/timeentries/${id}`);
  },
  // Deletes the time entry with the given id
  deleteTimeEntry(id) {
    return axios.delete(`/api/timeentries/${id}`);
  },
  // update a time entry in the database
  updateTimeEntry(id) {
    return axios.put(`/api/timeentries/${id}`);
  },
};
