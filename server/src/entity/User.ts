import {Entity, ObjectIdColumn, ObjectID, Column} from "typeorm";

@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    displayName: string;

    @Column()
    image: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
}
