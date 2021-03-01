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
    return this.http.get<Post[]>(`${environment.apiUrl}/api/posts`);
  }

  createPost(model: addPostModel) {
    return this.http.post<Post>(`${environment.apiUrl}/api/posts`, model);
  }

  updatePost(id: string,model: any){
    return this.http.put(`${environment.apiUrl}/api/posts/update/${id}`, model);
  }

  removePost(id: string) {
    return this.http.delete(`${environment.apiUrl}/api/posts/${id}`, {responseType: 'text'});
  }
}
