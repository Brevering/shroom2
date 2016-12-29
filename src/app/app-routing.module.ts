import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// import { AuthGuard } from './_guards/index';
import { LoginComponent } from './common/login/index';
import { RegisterComponent } from './common/register/index';
import { HomeComponent } from './home/index';
import { UserProfileComponent, UserPostsListComponent } from './user-profile/index';
import { CreatePostComponent } from './posts/index';


const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    { path: 'home', component: HomeComponent },

    // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
