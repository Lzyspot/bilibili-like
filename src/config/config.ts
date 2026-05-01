const api = window.location.protocol === 'https:' ? "https://" + window.location.hostname + ":6600" : "http://" + window.location.hostname + ":6600";
const ws = window.location.protocol === 'https:' ? "wss://" + window.location.hostname + ":6600" : "ws://" + window.location.hostname + ":6600";

export default {
  api: api,
  ws: ws,
  dir: "/pages/bilibili-like/"
  // ws: 'http://' + window.location.host.replace(/:\d+/, ':6600'),
  // dir: '/'
};
