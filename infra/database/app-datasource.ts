import { DataSource } from 'typeorm';
import { User } from '../../src/users/entity';
import { Keyword } from '../../src/keywords/entity';

export class AppDataSource {
    private static appDataSource: DataSource;

    public static getDataSource(): DataSource {
        try {
            if (!this.appDataSource) {
                this.appDataSource = new DataSource({
                    type: 'postgres',
                    host: 'database-postgres',
                    port: 5432,
                    username: process.env.DATABASE_USER,
                    password: process.env.DATABASE_PASSWORD,
                    database: process.env.DATABASE_NAME,
                    entities: [User, Keyword],
                    poolSize: 10,
                    connectTimeoutMS: 250,
                });
            }
            return this.appDataSource;
        } catch (e) {
            throw e;
        }
    }
}
