import { Timestamp } from "rxjs";
import { Lot } from "./lot.model";

export class User {
    constructor(
        public id?: number,
        public email?: string,
        public firstName?: string,
        public lastName?: string,
        public birthDate?: Date,
        public canEmailMe?: boolean,
        public wonTheBigLot?: Lot ,
        public hadHisGift?: boolean,
    ) {}
}
