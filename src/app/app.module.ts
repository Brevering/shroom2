import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UserProfileModule } from './user-profile/user-profile.module';

import { AppComponent } from './app.component';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, NewsService } from './_services/index';

import { SearchbarComponent } from './common/searchbar/searchbar.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { CategoriesListComponent } from './common/categories-list/categories-list.component';
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './common/register/register.component';
import { HomeComponent } from './home/home.component';
import { SafeUrlPipe } from './home/safe-url.pipe';
// import { UserProfileComponent } from './user-profile/user-profile.component';
// import { CreatePostComponent } from './posts/create-post.component';
// import { UserPostsListComponent } from './user-profile/user-posts-list.component';

import { AppRoutingModule } from './app-routing.module';
// import { UserProfileRoutingModule } from './user-profile/user-profile-routing.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        UserProfileModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,

        SearchbarComponent,
        NavbarComponent,
        CategoriesListComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        SafeUrlPipe,
        // UserProfileComponent,
        // CreatePostComponent,
        // UserPostsListComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        NewsService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
