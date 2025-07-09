import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'abc-dropdown',
  templateUrl: './dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
  @Output() closed = new EventEmitter<void>();
  @ViewChild(TemplateRef) templateRef!: TemplateRef<unknown>;
}
