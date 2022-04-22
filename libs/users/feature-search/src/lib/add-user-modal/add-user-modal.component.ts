import {
  Component,
  NgModule,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalRef } from '@abc/shared/ui';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

export interface ModalData {
  action: 'addUser' | 'closeModal';
  value?: unknown;
}

@Component({
  selector: 'abc-add-user',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserModalComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private readonly modalRef: ModalRef,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  closeModal() {
    const data: ModalData = { action: 'closeModal' };
    this.modalRef.close(data);
  }

  onSubmit() {
    const data: ModalData = { action: 'addUser', value: this.userForm.value };
    this.modalRef.close(data);
  }

  get name(): FormControl {
    return this.userForm.controls['name'] as FormControl;
  }

  get email(): FormControl {
    return this.userForm.controls['email'] as FormControl;
  }
}

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [AddUserModalComponent],
  exports: [AddUserModalComponent],
})
export class AddUserModalComponentModule {}
