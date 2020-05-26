import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../Models/user.model';
import { educationData } from '../Models/education.modal';
import { portfolioData } from '../Models/portfolioData.model';
import { profileData } from '../Models/profile.model';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { shareReplay, tap, share, distinctUntilChanged, finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private updatedUser = new BehaviorSubject<user>({
    profile: {
      name: '',
      image: '../../../assets/images/defaultUser.jpg',
      address: '',
      email: '',
      specialization: '',
      recentDegree: '',
      githubURL: '',
      cvURL: '',
    },
    aboutMe: '',
    projects: {
      completedProjects: 0,
      workingOn: 0
    },
    education: [],
    portfolio: [],
    skills: [],
    skillCount: 0
  });
  currentUpdatedUser = this.updatedUser.asObservable();

  // private updatedUser = new BehaviorSubject<any>({});

  private environmentApiBaseUrl = environment.apiBaseUrl;
  private fetchUserURL = this.environmentApiBaseUrl + '/api/user';
  private profileURL = this.environmentApiBaseUrl + '/api/profile';
  private profileImageURL = this.environmentApiBaseUrl + '/api/profileImage';
  private aboutMeURL = this.environmentApiBaseUrl + '/api/about';
  private skillURL = this.environmentApiBaseUrl + '/api/skill';
  private educationURL = this.environmentApiBaseUrl + '/api/education';
  private portfolioURL = this.environmentApiBaseUrl + '/api/portfolio';

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private userDataService: UserDataService) { }

  // ====================================== User Api========================================= //

  // get data from server
  fetchUser(): void {
    this.http.get<{message: string, data: user}>(this.fetchUserURL).pipe(
      shareReplay(),
      distinctUntilChanged(),
    )
    .subscribe( (response) => {
      // console.log('Inside Fetch User', response);
      this.userDataService.updateCurrentUser(response.data);
    });
  }

  // ====================================== Profile Api========================================= //
  updateMessage(response) {
    if (response.status) {
      this.fetchUser();
      this.snackBar.open(response.message, 'Dismiss' , {
        duration: 3 * 1000,
      });
    }
  }

  // edit profile in database
  updateProfile(profile: profileData) {
    this.http.put<{message: string, status: boolean}>(this.profileURL, profile).subscribe( (response) => {
      this.updateMessage(response);
    });
  }

  updateUserImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<{message: string, status: boolean}>(this.profileImageURL, formData).subscribe( (response) => {
      this.updateMessage(response);
    });
  }

  // ====================================== About Me Api========================================= //

  // edit about me in database
  updateAboutMe(aboutMe: { completedProjects: string; workingOn: string; aboutMe: string; }) {
    return this.http.put<{message: string, status: boolean}>(this.aboutMeURL, aboutMe).subscribe( (response) => {
      this.updateMessage(response);
    });
  }

  // ====================================== Skill Api========================================= //

  // add new skill in database
  newSkill(skill: string) {
    return this.http.post<{message: string, status: boolean}>(this.skillURL, {skill}).subscribe( (response) => {
      this.updateMessage(response);
    });
  }

  // edit skill in database
  editSkill(s: {_id: string, skill: string}) {
    return this.http.put<{message: string, status: boolean}>(this.skillURL + '/' + s._id, s).subscribe( (response) => {
      this.updateMessage(response);
    });
  }

  // edit skill in database
  deleteSkill( id: string ) {
    return this.http.delete<{message: string, status: boolean}>(this.skillURL + '/' + id).subscribe( (response) => {
      this.updateMessage(response);
    });
  }

  // ====================================== Education Api========================================= //

  // add new education in database
  newEducation(ed: educationData) {
    return this.http.post<{message: string, status: boolean}>(this.educationURL, ed).subscribe( (response) => {
      this.updateMessage(response);
    });
  }

  // edit education in database
  editEducation(ed: educationData) {
    return this.http.put<{message: string, status: boolean}>(this.educationURL + '/' + ed._id, ed).subscribe( (response) => {
      this.updateMessage(response);
    });
  }

  // edit education in database
  deleteEducation( id: string ) {
    return this.http.delete<{message: string, status: boolean}>(this.educationURL + '/' + id).subscribe( (response) => {
      this.updateMessage(response);
    });
  }

  // ====================================== Portfolio Api========================================= //

  // add new Portfolio in database
  newPortfolio(p: portfolioData) {
    return this.http.post<{message: string, status: boolean}>(this.portfolioURL, p).subscribe( (response) => {
      this.updateMessage(response);
    });
  }

  // edit Portfolio in database
  editPortfolio(p: portfolioData) {
    return this.http.put<{message: string, status: boolean}>(this.portfolioURL + '/' + p._id, p).subscribe( (response) => {
      this.updateMessage(response);
    });
  }

  // edit Portfolio in database
  deletePortfolio( id: string ) {
    return this.http.delete<{message: string, status: boolean}>(this.portfolioURL + '/' + id).subscribe( (response) => {
      this.updateMessage(response);
    });
  }
}
