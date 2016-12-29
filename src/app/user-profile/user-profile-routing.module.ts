import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileComponent } from './index';
import { UserPostsListComponent } from './index';
import { CreatePostComponent } from '../posts/index';
import { UserLikesListComponent } from './user-likes-list.component';

const userProfileRoutes: Routes = [
  {
    path: 'profile', component: UserProfileComponent, // make it profile/:user, add canActivate: [AuthGuard]
    children: [
      { path: '', component: CreatePostComponent },
      { path: 'my-posts', component: UserPostsListComponent },
      { path: 'my-likes', component: UserLikesListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userProfileRoutes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }