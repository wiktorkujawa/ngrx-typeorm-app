import { Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../components/elements/auth/auth.component';
import { select, Store } from '@ngrx/store';
import { UserState } from 'src/app/auth/store/reducers/user.reducer';
import { loadUser, login, logout, register } from 'src/app/auth/store/actions/user.actions';
import { selectMessage, selectUser } from 'src/app/auth/store/selectors/user.selectors';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss'],
})
export class PublicLayoutComponent implements OnInit {

  user$!: Observable<any>;
  message$!: Observable<any>;
  isMobile$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  onSwitchTheme({ checked }: any) {
    checked
      ? this.document.body.classList.add('alternate-theme')
      : this.document.body.classList.remove('alternate-theme');
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


  logout() {
    this.store.dispatch(logout());
    this.message$ = this.store.pipe(select(selectMessage));
  }

  constructor(
    private store: Store<UserState>,
    private breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) private document: Document,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.loadUser();

  }


  loadUser(): void {
    this.store.dispatch(loadUser());
    this.user$ = this.store.pipe(select(selectUser));
  }
}
