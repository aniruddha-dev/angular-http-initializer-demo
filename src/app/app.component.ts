import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConfigService } from './shared/services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-app-initializer-demo';
  constructor(private http: HttpClient, private config: ConfigService) {}

  ngOnInit() {
    this.config.api$.subscribe((data) => {
      console.log('app initializer => '+ data);
    });

    console.log('Promize Data: ' + this.config.apiEndpoints?.api[4].users)
    console.log('In AppComponent...');
  }
}