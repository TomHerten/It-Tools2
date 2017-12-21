import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AuthProvider } from '../providers/auth/auth';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { Vibration } from '@ionic-native/vibration';
import { Screenshot } from '@ionic-native/screenshot';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule } from '@angular/http';
import { NativeAudio } from '@ionic-native/native-audio';
import { ListPage } from '../pages/list/list';
import { QuizPage } from '../pages/quiz/quiz';
import { LocationsProvider } from '../providers/locations/locations';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';
import { FlashCardComponent } from '../components/flash-card/flash-card';
import { Data } from '../providers/data/data';

// Importing AF2 Module

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

// AF2 Settings
const firebaseConfig = {
  apiKey: "AIzaSyBFeSEzICHWv934dGM46f1XzdluULKiT7Q",
  authDomain: "ionic-test-75b21.firebaseapp.com",
  databaseURL: "https://ionic-test-75b21.firebaseio.com",
  projectId: "ionic-test-75b21",
  storageBucket: "ionic-test-75b21.appspot.com",
  messagingSenderId: "281623706110"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    ListPage,
    QuizPage,
    FlashCardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    ListPage,
    QuizPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SplashScreen,
    StatusBar, 
    AuthProvider,
    Vibration,
    Geolocation,
    Screenshot,
    LocationsProvider, 
    ConnectivityProvider,
    Data,
    NativeAudio
  ]
})
export class AppModule {}