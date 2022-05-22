export interface JdbcConfig{
    types:string;
    id :number;
    driveClassName ?:string;
    url:string;
    port?:number;
    username?: string;
    password?: string;
    basename?: string;
    tablename?: string;
    connectorType?: string;
    sql?: string;
}
