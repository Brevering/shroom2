import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { routing } from './app-routing.module';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, NewsService } from './_services/index';
// import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { SearchbarComponent } from './common/searchbar/searchbar.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { CategoriesListComponent } from './common/categories-list/categories-list.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        // HomeComponent,
        LoginComponent,
        RegisterComponent,
        SearchbarComponent,
        NavbarComponent,
        CategoriesListComponent
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
