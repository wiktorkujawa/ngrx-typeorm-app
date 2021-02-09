import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { addPostModel, Post } from '../model/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient ) { }

  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
  }

  createPost(model: addPostModel) {
    return this.http.post<Post>(`${environment.apiUrl}/posts`, model);
  }

  removePost(id: string) {
    return this.http.delete(`${environment.apiUrl}/posts/${id}`, {responseType: 'text'});
  }
}
