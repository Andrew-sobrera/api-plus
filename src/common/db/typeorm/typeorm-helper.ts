import { DataSource } from 'typeorm'
import { ENTITIES } from './entities/entities'
import mysql from 'mysql2' // Adicione esta linha para garantir que 'mysql2' seja usado

export class TypeOrmHelper {
    private static instance: DataSource

    static async createDataSource(): Promise<DataSource> {
        if (!this.instance) {
            this.instance = await new DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '123456', // Certifique-se de usar a senha correta
                database: 'api-plus-local',
                entities: ENTITIES,
                synchronize: false,
                logging: false,
                subscribers: [],
                migrations: [],
                extra: {
                    authPlugins: {
                        mysql_native_password: mysql.authPlugins.mysql_native_password
                    }
                }
            }).initialize()
        }
        
        return this.instance
    }
}
