import { Routes } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { AboutComponent } from './Components/about/about.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ProductdetailsComponent } from './Components/productsdetails/productsdetails.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { CartComponent } from './Components/cart/cart.component';
import { HomepageComponent } from './Components/homepage/homepage.component'; 

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomepageComponent},
    {path:'about',component:AboutComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path: "navbar", component:NavbarComponent},
    {path: "wishlist", component:WishlistComponent},
    {path:"product/:id",component:ProductdetailsComponent},
    {path:"profile/:id",component:ProfileComponent},
    {path: "cart",component:CartComponent},
    {path:"**",component:NotfoundComponent},


];
