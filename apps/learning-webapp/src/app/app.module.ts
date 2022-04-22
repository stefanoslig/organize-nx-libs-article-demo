import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { API_URL } from '@abc/shared/data-access';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    OverlayModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: API_URL, useValue: environment.api_url }],
  bootstrap: [AppComponent],
})
export class AppModule {}
