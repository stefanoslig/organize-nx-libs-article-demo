import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { ModalRef, MODAL_DATA } from '@abc/shared/ui';
import { Learning } from '@abc/shared/api-types';

@Component({
  selector: 'abc-assigned-learnings-modal',
  templateUrl: './assigned-learnings-modal.component.html',
  styleUrls: ['./assigned-learnings-modal.component.scss'],
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignedLearningsModalComponent {
  private readonly modalData = inject<Array<Learning>>(MODAL_DATA);
  private readonly modalRef = inject(ModalRef);

  learnings = this.modalData;

  closeModal() {
    this.modalRef.close();
  }
}
