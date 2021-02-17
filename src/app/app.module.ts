import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GraphqlModule } from '@graphql/modules/graphql.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './@admin/pages/admin.module';
import { PublicModule } from './@public/pages/public.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    PublicModule,
    AppRoutingModule,
    GraphqlModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
