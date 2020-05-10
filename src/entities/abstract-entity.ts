import { BaseEntity, ObjectID, ObjectIdColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class AbstractEntity extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;
}
