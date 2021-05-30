import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { user } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

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
    experience: [],
    portfolio: [],
    skills: [],
    skillCount: 0
  });

  currentUpdatedUser = this.updatedUser.asObservable();

  constructor() { }

  // updated current user
  updateCurrentUser(data: user) {
    this.updatedUser.next(data);
  }

}
