import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  Output,
  EventEmitter,
  Input,
  NgModule,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { map, takeUntil, tap, debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'abc-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements AfterViewInit, OnDestroy {
  @Input() searching = false;
  @Output() search = new EventEmitter<string>();
  @Output() resetSearch = new EventEmitter<void>();
  @ViewChild('searchField', { static: false }) searchField!: ElementRef;
  unsubscribe$ = new Subject<void>();

  ngAfterViewInit() {
    fromEvent(this.searchField.nativeElement, 'keyup')
      .pipe(
        map(
          (event) => ((event as KeyboardEvent).target as HTMLInputElement).value
        ),
        filter((value) => !value),
        tap(() => this.resetSearch.emit()),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  searchOnEnter(event: Event) {
    this.search.emit(
      ((event as KeyboardEvent).target as HTMLInputElement).value
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [SearchBarComponent],
  exports: [SearchBarComponent],
})
export class SearchBarModule {}
