import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { BlankComponent } from './blank.component';
import { BlankData } from './blank.data';
import { ngfModule, ngf } from 'angular-file';
export const routes = [
  { path: '', component: BlankComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,    
    InMemoryWebApiModule.forRoot(BlankData, { delay: 0 }),
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ngfModule,
    MultiselectDropdownModule,
    NgxPaginationModule,
    PipesModule
  ],
  declarations: [
    BlankComponent
  ]
})
export class BlankModule { }
