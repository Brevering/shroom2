import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserProfileRoutingModule } from './user-profile-routing.module';

import { UserProfileComponent } from './index';
import { UserPostsListComponent } from './index';
import { CreatePostComponent } from '../posts/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserProfileRoutingModule
  ],
  declarations: [UserProfileComponent, UserPostsListComponent, CreatePostComponent]
})
export class UserProfileModule { }
