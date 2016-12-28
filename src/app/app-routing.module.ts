import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// import { HomeComponent } from './home/index';
// import { AuthGuard } from './_guards/index';
import { LoginComponent } from './common/login/index';
import { RegisterComponent } from './common/register';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // { path: 'home', component: HomeComponent },
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    // { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },

    // // otherwise redirect to home
    // { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
