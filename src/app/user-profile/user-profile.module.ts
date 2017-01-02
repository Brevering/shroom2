import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserProfileRoutingModule } from './user-profile-routing.module';

import { UserProfileComponent, UserPostsListComponent, UserProfileUpdateComponent, UserProfileInformationComponent } from './index';
import { CreatePostComponent } from '../posts/index';
import { UserLikesListComponent } from './user-likes-list.component';

import { SafeUrlPipe } from '../home/safe-url.pipe';

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
    UserProfileInformationComponent,

    CreatePostComponent,
    UserLikesListComponent,
    UserLikesListComponent,
    SafeUrlPipe],
  exports: [
    SafeUrlPipe
  ]
})
export class UserProfileModule { }
