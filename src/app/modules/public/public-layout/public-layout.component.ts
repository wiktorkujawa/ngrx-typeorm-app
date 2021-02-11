import { Component, Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../components/elements/form/form.component';
import { User } from 'src/app/auth/models/user';
import { select, Store } from '@ngrx/store';
import { UserState } from 'src/app/auth/store/reducers/user.reducer';
import { register } from 'src/app/auth/store/actions/user.actions';
import { selectUsers } from 'src/app/auth/store/selectors/user.selectors';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss'],
})
export class PublicLayoutComponent {

  user$!: Observable<User>;

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

  openDialog( form: boolean){
    const ref = this.dialog.open( FormComponent, { 
      panelClass: 'my-dialog',
      closeOnNavigation: true, 
      data: {
        switched: form
      }
    });

    const sub = ref.componentInstance.FormSubmit.subscribe(( success: any) => {
      // this.authService.register(success.data);
      return this.store.dispatch(register({data: success.data}));

    });
    ref.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  constructor(
    private authService: AuthService,
    private store: Store<UserState>,
    private breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) private document: Document,
    public dialog: MatDialog
  ) {}
}
