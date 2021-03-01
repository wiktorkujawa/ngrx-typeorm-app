import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { loadUser, login, register } from 'src/app/auth/store/actions/user.actions';
import { selectUser } from 'src/app/auth/store/selectors/user.selectors';
import { AuthComponent } from '../../../../elements/auth/auth.component';
import { addPost, deletePost, loadPosts, updatePost } from '../../store/actions/post.actions';
import { Post } from '../../store/model/post';
import { PostState } from '../../store/reducers/post.reducer';
import { selectPosts } from '../../store/selectors/post.selectors';
import { AddPostComponent } from '../add-post/add-post.component';
import { UpdatePostComponent } from '../update-post/update-post.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChildren('child') child:any;

  posts$!: Observable<Post[]>;
  user$!: Observable<any>;

  cols! : number;
  margin!: string;
  gutter!: string;

  Breakpoint = {
    grid:{
      xl: 5,
      lg: 4,
      md: 3,
      sm: 2,
      xs: 1
    },
    margin:{
      xl: "3rem",
      lg: "2.5rem",
      md: "2rem",
      sm: "1.5rem",
      xs: "1rem"
    },
    gutter:{
      xl: "50px",
      lg: "40px",
      md: "30px",
      sm: "20px",
      xs: "10px"
    }
  };


  constructor(private store: Store<PostState>,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.Breakpoint.grid.xs;
          this.margin = this.Breakpoint.margin.xs;
          this.gutter = this.Breakpoint.gutter.xs;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.cols = this.Breakpoint.grid.sm;
          this.margin = this.Breakpoint.margin.sm;
          this.gutter = this.Breakpoint.gutter.sm;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = this.Breakpoint.grid.md;
          this.margin = this.Breakpoint.margin.md;
          this.gutter = this.Breakpoint.gutter.md;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.cols = this.Breakpoint.grid.lg;
          this.margin = this.Breakpoint.margin.lg;
          this.gutter = this.Breakpoint.gutter.lg;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.Breakpoint.grid.xl;
          this.margin = this.Breakpoint.margin.xl;
          this.gutter = this.Breakpoint.gutter.xl;
        }
      }
    });
  }

  addModal(){
    const ref = this.dialog.open(AddPostComponent, { width: '60vw',
    minWidth:"350px",
    panelClass: 'my-dialog',
    });
    const sub = ref.componentInstance.addPost.subscribe((post:any) => {
      this.store.dispatch(addPost({ post: post}))
    });
      ref.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  };

  updateModal(model:any){
    let { id, ...post} =model;
    const ref = this.dialog.open(UpdatePostComponent, { width: '60vw',
    minWidth:"350px",
    panelClass: 'my-dialog', data: {
      post: post,
      user: this.user$.subscribe(data => data)
    }});
    const sub = ref.componentInstance.updatePost.subscribe((newPost: any) => {
      console.log(newPost)
      this.store.dispatch(updatePost({ id: id, changes: newPost}));
    });
    ref.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  deletePost(id:string){
    this.store.dispatch(deletePost({id:id}));
  }

  AuthDialog( form: boolean){
    const ref = this.dialog.open( AuthComponent, { 
      panelClass: 'my-dialog',
      closeOnNavigation: true,
      data: {
        switched: form
      }
    });

    const sub = ref.componentInstance.RegisterOrLogin.subscribe(( success: any) => {
      success.switched ?
      this.store.dispatch(login({data: success.data}))
      : this.store.dispatch(register({data: success.data}))
      this.user$.subscribe(data => {
        if(data[0]!==null)
        ref.close();
      });
      

    });
    ref.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.loadNewPosts();
    this.getUser();
  }

  getUser(): void {
    this.user$ = this.store.pipe(select(selectUser));
  }

  loadNewPosts(): void {
    this.store.dispatch(loadPosts());
    this.posts$ = this.store.pipe(select(selectPosts));
  }

}
