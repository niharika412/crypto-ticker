import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CurDetailsComponent } from './cur-details/cur-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:'search',component:SearchComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:"**", component:SearchComponent,pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
