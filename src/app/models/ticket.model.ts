import { Lot } from "./lot.model";
import { User } from "./user.model";

export class Ticket {
    constructor(
        public id?: number,
        public name?: string,
        public lot?: Lot,
        public user?: User,
        public hadTheGift?: boolean
    ) {}
}