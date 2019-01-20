import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 100,
  duration: '600s',
  rps: 5000,
};

export default function () {
  const number = Math.floor((Math.random() * 10000000)).toString();
  http.get('http://127.0.0.1:3004/products/' + number);
}
