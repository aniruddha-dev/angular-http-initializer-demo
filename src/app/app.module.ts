import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './shared/services/config.service';
import { take } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

export function loadConfigurations(configService: ConfigService) {
  return () => configService.fetchEndpoints();
}

export function loadConfigurations2(configService: ConfigService) {
  return () => configService.loadEndpoints();
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: loadConfigurations,
      deps: [ConfigService],
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: loadConfigurations2,
      deps: [ConfigService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
