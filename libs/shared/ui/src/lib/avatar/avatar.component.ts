import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';

@Component({
  selector: 'abc-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() name!: string;
  @Input() size: 'small' | 'regular' | 'large' | 'extra-large' = 'regular';
}

@NgModule({
  declarations: [AvatarComponent],
  exports: [AvatarComponent],
  imports: [CommonModule],
})
export class AvatarComponentModule {}
