import { Theater } from "./theater.model";

export class Seat {
  id?: number;
  location: String;
  reclining: boolean;
  theater_id?: number;
  theater?: Theater;
}
