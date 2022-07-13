import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { JwtInterceptor } from './core/auth/jwt.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    AppConfigService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
