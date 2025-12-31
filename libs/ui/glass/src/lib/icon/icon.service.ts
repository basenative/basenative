import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, tap, map, of } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  // Cache for raw SVG strings to avoid re-fetching
  private cache = new Map<string, Observable<SafeHtml>>();

  getIcon(name: string): Observable<SafeHtml> {
    if (this.cache.has(name)) {
      return this.cache.get(name)!;
    }

    const request$ = this.http
      .get(`assets/icons/${name}.svg`, { responseType: 'text' })
      .pipe(
        map((svg) => this.sanitizer.bypassSecurityTrustHtml(svg)),
        shareReplay(1),
      );

    this.cache.set(name, request$);
    return request$;
  }

  preload(names: string[]) {
    names.forEach((name) => this.getIcon(name).subscribe());
  }
}
