import {
  Component,
  ChangeDetectionStrategy,
  NgModule,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'abc-dropdown',
  templateUrl: './dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
  @Output() closed = new EventEmitter<void>();
  @ViewChild(TemplateRef) templateRef!: TemplateRef<unknown>;
}

@NgModule({
  imports: [CommonModule],
  declarations: [DropdownComponent],
  exports: [DropdownComponent],
})
export class DropdownComponentModule {}
