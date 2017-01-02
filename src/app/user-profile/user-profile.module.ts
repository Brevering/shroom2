import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserProfileRoutingModule } from './user-profile-routing.module';

import { UserProfileComponent, UserPostsListComponent, UserProfileUpdateComponent } from './index';
import { CreatePostComponent } from '../posts/index';
import { UserLikesListComponent } from './user-likes-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserProfileRoutingModule
  ],
  declarations: [
    UserProfileComponent,
    UserPostsListComponent,
    UserProfileUpdateComponent,
    CreatePostComponent,
    UserLikesListComponent,
    UserLikesListComponent]
})
export class UserProfileModule { }
