import { Seat } from "./seat.model";

export class Theater {
  id?: number;
  location: String;
  capacity: number;
  seats?: Seat[];
}
