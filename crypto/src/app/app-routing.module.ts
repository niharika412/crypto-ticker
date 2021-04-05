import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurDetailsComponent } from './cur-details/cur-details.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:'search',component:SearchComponent},
  {path:"**", component:SearchComponent,pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
