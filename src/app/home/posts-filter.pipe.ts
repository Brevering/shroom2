import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../_models/post';

@Pipe({
    name: 'postsFilter'
})

export class PostsFilterPipe implements PipeTransform {
    
    transform(posts: Post[], filterValue: string): Post[] {
        if (!filterValue) {
            return posts;
        }

        return posts.filter(item =>
        (item.title.toLocaleLowerCase().indexOf(filterValue) > -1)
        || ((item.body) && (item.body.toLocaleLowerCase().indexOf(filterValue) > -1))
        || (item.author.toLocaleLowerCase().indexOf(filterValue) > -1) );
    }
}