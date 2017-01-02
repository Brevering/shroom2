import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from './_guards/index';
import { LoginComponent } from './common/login/index';
import { RegisterComponent } from './common/register/index';
import { NotFoundComponent } from './common/not-found/index';
import { HomeComponent } from './home/index';
import { AboutComponent } from './common/about/index';
import { UserProfileComponent, UserPostsListComponent } from './user-profile/index';
import { CreatePostComponent } from './posts/index';
import { PostDetailsComponent } from './posts/index';


const appRoutes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'post/:id', component: PostDetailsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
    { path: 'about', component: AboutComponent },

    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
