import { AlertComponent } from './alert/alert.component';
import { ButtonComponent } from './button/button.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AlertComponent, ButtonComponent],
  imports: [CommonModule],
  exports: [AlertComponent, ButtonComponent],
})
export class SharedModule {}
