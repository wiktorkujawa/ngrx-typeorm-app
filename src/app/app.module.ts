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
import { DateTimePickerField } from './modules/shared/material/custom-formly/date-time-picker/date-time-picker.component';
import { FormlyModule } from '@ngx-formly/core';
import { HomeComponent } from './modules/public/components/pages/home/home.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PublicLayoutComponent,
    AdminLayoutComponent,
    FormComponent,
    DateTimePickerField,
    HomeComponent
  ],
  imports: [
    FormlyModule.forRoot({ extras: { lazyRender: true }, types: [
      { name: 'datetimepicker', component: DateTimePickerField },
    ] }),
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, {}),
    HttpClientModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
