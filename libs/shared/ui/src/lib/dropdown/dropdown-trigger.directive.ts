import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgModule,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
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
  private _isDropdownOpen = false;
  private _overlayRef!: OverlayRef;

  @Input('abcDropdownTrigger') public dropdownPanel!: DropdownPanel;
  @HostListener('click')
  onClick() {
    this._isDropdownOpen ? this.close() : this.open();
  }

  constructor(
    private readonly overlay: Overlay,
    private elementRef: ElementRef<HTMLElement>,
    private viewContainerRef: ViewContainerRef
  ) {}

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

@NgModule({
  imports: [CommonModule, OverlayModule],
  declarations: [DropdownTriggerDirective],
  exports: [DropdownTriggerDirective],
})
export class DropdownTriggerDirectiveModule {}
