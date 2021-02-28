import {Entity, ObjectIdColumn, ObjectID, Column} from "typeorm";

@Entity()
export class Post {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    content: string;

    @Column()
    path: string;

    @Column()
    email: string;
    
    @Column()
    fileImage: boolean;
    
    @Column() 
    files_id: string;

    @Column()
    created_at: number;

    @Column()
    modified_at: number;
    
}
