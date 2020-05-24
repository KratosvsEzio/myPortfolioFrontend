import { educationData } from './education.modal';
import { portfolioData } from './portfolioData.model';
import { profileData } from './profile.model';

export interface user {
  profile: profileData;
  aboutMe: string;
  projects: {
    completedProjects: number;
    workingOn: number;
  };
  education: educationData[];
  portfolio: portfolioData[];
  skills: {
    _id: string;
    skill: string;
  }[];
  skillCount: number;
}
