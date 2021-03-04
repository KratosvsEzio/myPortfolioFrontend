import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProjectDialogComponent } from './Components/project-dialog/project-dialog.component';
import { ServicesComponent } from './Components/services/services.component';
import { HeaderComponent } from 'src/app/Components/header/header.component';
import { BannerComponent } from 'src/app/Components/banner/banner.component';

// Directives
import { DataToolTipDirective } from './Directives/data-tool-tip.directive';

// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatDialogModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { AuthInterceptor } from './Service/auth-interceptor';
import { NgPipesModule } from 'ngx-pipes';

// Auth0
// const config = new AuthServiceConfig([
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider('5126203523-o4445m07k6m6kjj9313p8flpd2meqmpd.apps.googleusercontent.com')
//   }
// ]);

// export function provideConfig() {
//   return config;
// }

@NgModule({
  declarations: [
    AppComponent,
    DataToolTipDirective,
    ServicesComponent,
    ProjectDialogComponent,
    HeaderComponent,
    BannerComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    // Auth0 Module
    SocialLoginModule,
    // SocialLoginModule.initialize(config),
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
    NgPipesModule,
  ],
  providers: [
    // Auth0 provider to all app
    {
      provide: AuthServiceConfig,
      useFactory: () => { return new AuthServiceConfig([ {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('5126203523-o4445m07k6m6kjj9313p8flpd2meqmpd.apps.googleusercontent.com')
          }
        ])
      }
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
