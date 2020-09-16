// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// App
import { RouterComponent } from '../router/router.component';

const routes: Routes = [
  {
    path: '',
    component: RouterComponent,
    data: {
      title: 'home'
    },
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }



