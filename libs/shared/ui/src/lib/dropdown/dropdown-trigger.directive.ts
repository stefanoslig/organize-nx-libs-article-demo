import { Directive, ElementRef, EventEmitter, HostListener, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { merge, take } from 'rxjs';
import { TemplatePortal } from '@angular/cdk/portal';

class DropdownPanel {
  templateRef!: TemplateRef<unknown>;
  readonly closed!: EventEmitter<void>;
}

@Directive({
  selector: '[abcDropdownTrigger]',
  
})
export class DropdownTriggerDirective {
  private readonly overlay = inject(Overlay);
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private viewContainerRef = inject(ViewContainerRef);

  private _isDropdownOpen = false;
  private _overlayRef!: OverlayRef;

  @Input('abcDropdownTrigger') public dropdownPanel!: DropdownPanel;
  @HostListener('click')
  onClick() {
    this._isDropdownOpen ? this.close() : this.open();
  }

  open() {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: 8,
        },
      ]);

    this._overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.close(),
      panelClass: 'overlay-panel',
      maxHeight: '300px'
    });

    const portal = new TemplatePortal(
      this.dropdownPanel.templateRef,
      this.viewContainerRef
    );
    this._overlayRef.attach(portal);

    merge(this._overlayRef.backdropClick(), this.dropdownPanel.closed)
      .pipe(take(1))
      .subscribe(() => this.close());
  }

  public close() {
    this._overlayRef.dispose();
  }
}

