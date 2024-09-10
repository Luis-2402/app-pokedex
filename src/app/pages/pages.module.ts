import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//pages
import { HomeComponent } from './home/home.component';

//routing module
import { DetailsComponent } from './details/details.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class PagesModule { }
