import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../model/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient ) { }

  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
  }

  createPost(model: Post) {
    return this.http.post<Post>(`${environment.apiUrl}/posts`, model);
  }
}
