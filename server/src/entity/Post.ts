import {Entity, ObjectIdColumn, ObjectID, Column} from "typeorm";

@Entity()
export class Post {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    subject: string;

    @Column()
    content: string;

}
