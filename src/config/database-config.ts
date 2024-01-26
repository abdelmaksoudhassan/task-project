import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

export const typeOrmConfig:TypeOrmModuleOptions = {
    // type: 'mysql',
    // host: 'localhost',
    // port: 3306,
    // username: 'root',
    // password: 'root',
    // database: 'taskdb',
    // entities: [join(__dirname,'./../**','*.entity.{js,ts}')],
    // synchronize: true

    type: 'mysql',
    host: 'bkb5gwwcrgqbt9aaqxs3-mysql.services.clever-cloud.com',
    port: 3306,
    username: 'uilq33jwgmxlxsgl',
    password: '5GmjcutijcVbLeVPcYo5',
    database: 'bkb5gwwcrgqbt9aaqxs3',
    entities: [join(__dirname,'./../**','*.entity.{js,ts}')],
    synchronize: true
}