export interface JdbcConfig{
    id :number;
    driveClassName :string;
    url:string;
    username: string;
    password: string;
    connectorType: string;
    sql: string;
}
