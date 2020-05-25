import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../Models/user.model';
import { educationData } from '../Models/education.modal';
import { portfolioData } from '../Models/portfolioData.model';
import { profileData } from '../Models/profile.model';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private updatedUser = new Subject<user>();

  private environmentApiBaseUrl = environment.apiBaseUrl;
  private fetchUserURL = this.environmentApiBaseUrl + '/api/user';
  private profileURL = this.environmentApiBaseUrl + '/api/profile';
  private profileImageURL = this.environmentApiBaseUrl + '/api/profileImage';
  private aboutMeURL = this.environmentApiBaseUrl + '/api/about';
  private skillURL = this.environmentApiBaseUrl + '/api/skill';
  private educationURL = this.environmentApiBaseUrl + '/api/education';
  private portfolioURL = this.environmentApiBaseUrl + '/api/portfolio';

  constructor(private http: HttpClient) { }

  // ====================================== User Api========================================= //

  // get updated current user
  getUser() {
    this.fetchUser();
    return this.updatedUser.asObservable();
  }

  // get data from server
  fetchUser() {
    this.http.get<{message: string, data: user}>(this.fetchUserURL).subscribe( (response) => {
      this.updatedUser.next(response.data);
    });
  }

  // ====================================== Profile Api========================================= //

  // edit profile in database
  updateProfile(profile: profileData): Observable<{message: string, status: boolean}> {
    return this.http.put<{message: string, status: boolean}>(this.profileURL, profile);
  }

  updateUserImage(image: File): Observable<{message: string, status: boolean}> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<{message: string, status: boolean}>(this.profileImageURL, formData);
  }

  // ====================================== About Me Api========================================= //

  // edit about me in database
  updateAboutMe(aboutMe: { completedProjects: string; workingOn: string; aboutMe: string; }):
    Observable<{message: string, status: boolean}> {
    return this.http.put<{message: string, status: boolean}>(this.aboutMeURL, aboutMe);
  }

  // ====================================== Skill Api========================================= //

  // add new skill in database
  newSkill(skill: string): Observable<{message: string, status: boolean}> {
    return this.http.post<{message: string, status: boolean}>(this.skillURL, {skill});
  }

  // edit skill in database
  editSkill(s: {_id: string, skill: string}): Observable<{message: string, status: boolean}> {
    return this.http.put<{message: string, status: boolean}>(this.skillURL + '/' + s._id, s);
  }

  // edit skill in database
  deleteSkill( id: string ): Observable<{message: string, status: boolean}> {
    return this.http.delete<{message: string, status: boolean}>(this.skillURL + '/' + id);
  }

  // ====================================== Education Api========================================= //

  // add new education in database
  newEducation(ed: educationData): Observable<{message: string, status: boolean}> {
    return this.http.post<{message: string, status: boolean}>(this.educationURL, ed);
  }

  // edit education in database
  editEducation(ed: educationData): Observable<{message: string, status: boolean}> {
    return this.http.put<{message: string, status: boolean}>(this.educationURL + '/' + ed._id, ed);
  }

  // edit education in database
  deleteEducation( id: string ): Observable<{message: string, status: boolean}> {
    return this.http.delete<{message: string, status: boolean}>(this.educationURL + '/' + id);
  }

  // ====================================== Portfolio Api========================================= //

  // add new Portfolio in database
  newPortfolio(p: portfolioData): Observable<{message: string, status: boolean}> {
    return this.http.post<{message: string, status: boolean}>(this.portfolioURL, p);
  }

  // edit Portfolio in database
  editPortfolio(p: portfolioData): Observable<{message: string, status: boolean}> {
    return this.http.put<{message: string, status: boolean}>(this.portfolioURL + '/' + p._id, p);
  }

  // edit Portfolio in database
  deletePortfolio( id: string ): Observable<{message: string, status: boolean}> {
    return this.http.delete<{message: string, status: boolean}>(this.portfolioURL + '/' + id);
  }
}
