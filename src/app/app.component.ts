import { Component } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export function media(query: string): Observable<boolean> {
  const mediaQuery = window.matchMedia(query);
  return fromEvent<MediaQueryList>(mediaQuery, 'change').pipe(
    startWith(mediaQuery),
    map((list: MediaQueryList) => list.matches)
  );
}
@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="sm$ | async">sm</div>
    <div *ngIf="md$ | async">md</div>
    <div *ngIf="lg$ | async">lg</div>
    <div *ngIf="xl$ | async">xl</div>
    <div *ngIf="xl2$ | async">2xl</div>
  `,
})
export class AppComponent {
  sm$ = media(`(max-width: 767px)`);
  md$ = media(`(min-width: 768px) and (max-width: 1023px)`);
  lg$ = media(`(min-width: 1024px) and (max-width: 1279px)`);
  xl$ = media(`(min-width: 1280px) and (max-width: 1535px)`);
  xl2$ = media(`(min-width: 1536px)`);
}
