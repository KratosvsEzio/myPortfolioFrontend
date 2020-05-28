import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { BannerComponent } from './Components/banner/banner.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { AboutComponent } from './Components/about/about.component';
import { EducationComponent } from './Components/education/education.component';
import { PortfolioComponent } from './Components/portfolio/portfolio.component';
import { ContactComponent } from './Components/contact/contact.component';
import { AppRoutingModule, routingComponent} from './app-routing.module';
import { ProjectDialogComponent } from './Components/project-dialog/project-dialog.component';
import { HomeComponent } from './Components/home/home.component';
import { ServicesComponent } from './Components/services/services.component';

// Directives
import { DataToolTipDirective } from './Directives/data-tool-tip.directive';

// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatDialogModule  } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { AuthInterceptor } from './Service/auth-interceptor';

// Auth0
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('5126203523-o4445m07k6m6kjj9313p8flpd2meqmpd.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    ProfileComponent,
    DataToolTipDirective,
    AboutComponent,
    EducationComponent,
    PortfolioComponent,
    routingComponent,
    ContactComponent,
    HomeComponent,
    ServicesComponent,
    ProjectDialogComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    // Auth0 Module
    SocialLoginModule,
    // .initialize(config),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    [
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSnackBarModule
    ],
    AppRoutingModule,
  ],
  providers: [
    // Auth0 provider to all app
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ProjectDialogComponent]
})
export class AppModule { }
