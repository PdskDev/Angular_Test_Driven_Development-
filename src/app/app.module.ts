import { AlertComponent } from './shared/alert/alert.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonComponent } from './shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [AppComponent, SignUpComponent],
  imports: [BrowserModule, HttpClientModule, SharedModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
