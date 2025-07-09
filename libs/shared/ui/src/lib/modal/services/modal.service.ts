import { Injectable, Injector, inject } from '@angular/core';
import { ComponentType, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MODAL_DATA } from '../tokens/modal.token';
import { take } from 'rxjs';
import { ModalRef } from './modal-ref';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);

  private _overlayRef!: OverlayRef;

  /**
   * Opens the modal.
   * @param component The component we want to use in the modal.
   * @param data The data we want to pass in the modal.
   */
  open<T, D>(component: ComponentType<T>, data?: D): ModalRef {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    this._overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      panelClass: 'overlay-panel',
      height: '500px',
      width: '600px'
    });

    const modalRef = new ModalRef(this._overlayRef);

    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: ModalRef, useValue: modalRef },
        { provide: MODAL_DATA, useValue: data },
      ],
    });

    const portal = new ComponentPortal(component, null, injector);
    this._overlayRef.attach(portal);

    this._overlayRef
      .backdropClick()
      .pipe(take(1))
      .subscribe(() => this.close());

      return modalRef;
  }

  /**
   * close the modal
   */
  public close() {
    this._overlayRef.dispose();
  }
}
