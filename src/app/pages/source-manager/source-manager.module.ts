import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { SourceManagerRoutingModule } from './source-manager-routing.module';
import { SourceManagerComponent } from './source-manager.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SourceConfigComponent } from './source-config/source-config.component';
import { SqlSqlComponent } from './sql-sql/sql-sql.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { JdbcComponent } from './source-config/jdbc/jdbc.component';
import { KafkaComponent } from './source-config/kafka/kafka.component';
import { HdfsComponent } from './source-config/hdfs/hdfs.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { RedisComponent } from './source-config/redis/redis.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SocketComponent } from './source-config/socket/socket.component';
import { CsvComponent } from './source-config/csv/csv.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DynamicClassComponent } from './dynamic-class/dynamic-class.component';
import { JdbcDynamicComponent } from './dynamic-class/jdbc/jdbc.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
@NgModule({
  declarations: [
    SourceManagerComponent,
    SourceConfigComponent,
    SqlSqlComponent,
    JdbcComponent,
    KafkaComponent,
    HdfsComponent,
    RedisComponent,
    SocketComponent,
    CsvComponent,
    DynamicClassComponent,
    JdbcDynamicComponent
  ],
  imports: [
    CommonModule,
    SourceManagerRoutingModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    FormsModule,
    NzCardModule,
    NzCollapseModule,
    NzDescriptionsModule,
    NzButtonModule,
    NzDropDownModule,
    NzSpaceModule,
    NzModalModule,
    NzIconModule,
    ReactiveFormsModule,
    NzSelectModule
  ]
})
export class SourceManagerModule { }
