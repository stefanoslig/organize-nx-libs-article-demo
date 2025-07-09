import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';

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
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserModalComponent implements OnInit {
  private readonly modalRef = inject(ModalRef);
  private readonly fb = inject(FormBuilder);

  userForm!: FormGroup;

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
