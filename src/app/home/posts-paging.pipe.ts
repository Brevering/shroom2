import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../_models/post';

@Pipe({
    name: 'postsPaging'
})

export class PostsPagingPipe implements PipeTransform {
    
    transform(posts: Post[], page: number, pageSize: number): Post[] {
        if (!posts) {
            return [];
        }
        let begin = (page - 1) * pageSize,
            end = begin + pageSize;

        return posts.slice(begin, end);
    }
}