import { Component, Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../components/elements/form/form.component';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss'],
})
export class PublicLayoutComponent {
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
      console.log(success);
    });
    ref.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) private document: Document,
    public dialog: MatDialog
  ) {}
}
