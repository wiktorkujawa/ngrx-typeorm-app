import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublicLayoutComponent } from './modules/public/public-layout/public-layout.component';
import { AdminLayoutComponent } from './modules/admin/admin-layout/admin-layout.component';
import { MaterialModule } from './modules/shared/material/material.module';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { DateTimePickerComponent } from './modules/shared/material/custom-formly/date-time-picker/date-time-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    PublicLayoutComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true }, types: [
      { name: 'datetimepicker', component: DateTimePickerComponent },
    ] }),
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    FormlyMaterialModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
