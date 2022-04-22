import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, Observable } from 'rxjs';

/**
 * A reference to the modal itself.
 * Can be injected into the component added to the overlay and then used to close itself.
 */
export class ModalRef {
  private afterClosedSubject = new Subject();

  constructor(private overlayRef: OverlayRef) {}

  /**
   * Closes the overlay. You can optionally provide a result.
   */
  public close(result?: unknown) {
    this.overlayRef.dispose();
    this.afterClosedSubject.next(result);
    this.afterClosedSubject.complete();
  }

  /**
   * An Observable that notifies when the overlay has closed
   */
  public afterClosed<T>(): Observable<T> {
    return this.afterClosedSubject.asObservable() as Observable<T>;
  }
}
