export interface JdbcConfig{
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
