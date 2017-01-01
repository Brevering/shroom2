import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ConfirmDirective, EqualValidator } from './_directives/index';


// Common components
import { AlertComponent } from './common/alert/alert.component';
import { AboutComponent } from './common/about/about.component';
import { SearchbarComponent } from './common/searchbar/searchbar.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { CategoriesListComponent } from './common/categories-list/categories-list.component';
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './common/register/register.component';
import { NotFoundComponent } from './common/not-found/not-found.component';

// Home-related Components
import { HomeComponent } from './home/home.component';

// Post related Components
import { PostDetailsComponent } from './posts/post-details.component';

// User-related Components/Modules
import { UserProfileModule } from './user-profile/user-profile.module';

// Services
import { AuthenticationService, UserService, AlertService, PostsService } from './_services/index';

// Pipes 7 Directives
import { SafeUrlPipe } from './home/safe-url.pipe';

// Guards
import { AuthGuard } from './_guards/index';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        UserProfileModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        SearchbarComponent,
        NavbarComponent,
        CategoriesListComponent,
        LoginComponent,
        RegisterComponent,
        NotFoundComponent,
        HomeComponent,
        SafeUrlPipe,
        PostDetailsComponent,
        AboutComponent,
        ConfirmDirective,
        EqualValidator
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        PostsService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
