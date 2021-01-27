import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublicLayoutComponent } from './modules/public/public-layout/public-layout.component';
import { AdminLayoutComponent } from './modules/admin/admin-layout/admin-layout.component';
import { MaterialModule } from './modules/shared/material/material.module';
import { FormComponent } from './modules/public/components/elements/form/form.component';
import { DateTimePickerComponent } from './modules/shared/material/custom-formly/date-time-picker/date-time-picker.component';
import { FormlyModule } from '@ngx-formly/core';
import { HomeComponent } from './modules/public/components/pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    PublicLayoutComponent,
    AdminLayoutComponent,
    FormComponent,
    DateTimePickerComponent,
    HomeComponent
  ],
  imports: [
    FormlyModule.forRoot({ extras: { lazyRender: true }, types: [
      { name: 'datetimepicker', component: DateTimePickerComponent },
    ] }),
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
