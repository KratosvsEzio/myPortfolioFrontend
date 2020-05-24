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

// Directives
import { DataToolTipDirective } from './Directives/data-tool-tip.directive';

// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule  } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { HomeComponent } from './Components/home/home.component';
import { ServicesComponent } from './Components/services/services.component';
import { AuthInterceptor } from './Service/auth-interceptor';

// Auth0
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('5126203523-es54glrb2p1rd68vehtc371hf17jcvt9.apps.googleusercontent.com')
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
  ],
  imports: [
    BrowserModule,
    // Auth0 Module
<<<<<<< HEAD
    // SocialLoginModule,
    // .initialize(new AuthServiceConfig([
    //     {
    //       id: GoogleLoginProvider.PROVIDER_ID,
    //       provider: new GoogleLoginProvider('5126203523-es54glrb2p1rd68vehtc371hf17jcvt9.apps.googleusercontent.com')
    //     }
    //   ])
    // ),
=======
    SocialLoginModule.initialize(config),
>>>>>>> parent of d8e32dd... removed errors
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
<<<<<<< HEAD
    // {
    //   provide: AuthServiceConfig,
    //   useFactory: () => {
    //     return new AuthServiceConfig([
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider('5126203523-es54glrb2p1rd68vehtc371hf17jcvt9.apps.googleusercontent.com')
    //       }
    //     ]);
    //   }
    // },
=======
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
>>>>>>> parent of d8e32dd... removed errors
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
