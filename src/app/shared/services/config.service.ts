import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, of, tap } from 'rxjs';

interface Endpoints {
  api: any;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private apiURl = 'https://raw.githubusercontent.com/piyalidas10/dummy-json/main/initializer.json';
  private endpoints = new BehaviorSubject<Endpoints | null>(null);
  readonly api$ = this.endpoints.asObservable().pipe(
    filter((endpoints) => !!endpoints),
    map((endpoints) => endpoints?.api)
  );

  get api() {
    return this.endpoints.getValue()?.api;
  }

  // for promize
  apiEndpoints: Endpoints | undefined;

  constructor(private http: HttpClient) {}

  fetchEndpoints() {
    this.http.get<Endpoints>(this.apiURl).subscribe({
      next: (endpoints) => {
        console.log('In observable...');
        this.endpoints.next(endpoints);
      },
      error: () => this.endpoints.next({ api: [] }),
    });
  }

  loadEndpoints() {
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(this.apiURl)
        .toPromise()
        .then((res) => {
          if (res) {
            console.log('In Promize...');
            this.apiEndpoints = res as Endpoints;
          }
          resolve();
        });
    });
  }
}
