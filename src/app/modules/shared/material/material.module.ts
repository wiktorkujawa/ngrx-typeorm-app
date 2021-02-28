// Material modules
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Formly modules
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { NgxDropzoneModule } from 'ngx-dropzone';

const MaterialComponents = [
  MatSnackBarModule,
  LayoutModule,
  MatInputModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatButtonToggleModule,
  MatGridListModule,
  MatCardModule,
  MatDialogModule,
  MatMenuModule,
  MatTableModule,
  MatSlideToggleModule,
  MatSortModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatDatepickerModule,
  FormlyMatDatepickerModule,
  FormlyMaterialModule,
  NgxDropzoneModule
];

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule {}
