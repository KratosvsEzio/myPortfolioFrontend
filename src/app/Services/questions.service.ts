import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { QuestionsModel } from '../Models/questions.models';
import { tap, map, filter, shareReplay, take } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { AnswersService } from './answers.service';
import { ReviewService } from './review.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  // private questionsUrl = 'https://gre-api-270614.appspot.com/api/v1/questions2/';
  private questionsUrl = environment.apiBaseUrl + 'questions/';
  private q = new BehaviorSubject<QuestionsModel[]>([]);
  questions: Observable<QuestionsModel[]> = this.q.asObservable();
  checkQuestionsStatusSubject = new BehaviorSubject<boolean>(false);
  checkQuestionsStatus: Observable<boolean> = this.checkQuestionsStatusSubject.asObservable();
  currentUrl: string;

  constructor(
    public http: HttpClient,
    private loadingService: LoadingService,
    private answerService: AnswersService,
    private reviewService: ReviewService,
    ) {
  }

  getAllQuestions() {
    console.log('hello from get all questions');
    const questions$ = this.http.get<any>(this.questionsUrl)
    .pipe(
      map( questions => {
        return questions.map( (question: {
          question:
          { id: any; text: any; question_type: any; image: any; answer: any; difficulty_level: any; };
        }) => {
          return {
            id: question.question.id,
            text: question.question.text,
            question_type: question.question.question_type,
            image: question.question.image,
            answer: question.question.answer,
            difficulty_level: question.question.difficulty_level,
            options: this.checkOptionsNull(question.question)
          };
        });
      }),
      take(1),
      shareReplay(1),
      tap( questions => {
        this.q.next(questions);
        console.log(questions);
        this.answerService.populateArray(questions);
        this.reviewService.populateArray(questions);
      })
    );
    this.loadingService.showLoaderUntilCompleted(questions$).subscribe();
    this.checkQuestionsStatusSubject.next(true);

    //  Hard coded Questions Array
    const temp = [
      {
        id: 1,
        options: [
          {
            optionA: 'Cold',
            optionB: 'Hot',
            optionC: 'Too Cold'
          },
          {
            optionA: 'Too hot',
            optionB: 'Hoty',
            optionC: 'Coldy'
          },
          {
            optionA: 'Too Hoty',
            optionB: 'Too Coldy',
            optionC: 'Tooo Hoty'
          }
        ],
        text: 'What is the weather of lahore?',
        question_type: 3,
        image: null,
        answer: 7,
        difficulty_level: 1
      },
      {
        id: 2,
        options: [
          {
            optionA: 'Too hot',
            optionB: 'Too Cold',
            optionC: 'Too Warm'
          },
          {
            optionA: 'Too Sunny',
            optionB: 'Shit is hot',
            optionC: 'Shit is Cold'
          }
        ],
        text: 'What is the weather of Karachi?',
        question_type: 2,
        image: null,
        answer: 1,
        difficulty_level: 1
      },
      {
        id: 3,
        options: [
          {
            optionA: 'Lahore',
            optionB: 'Karachi',
            optionC: 'Islamabad',
            optionD: 'Peshawar'
          }
        ],
        text: 'What is the capital of Pakistan?',
        question_type: 1,
        image: null,
        answer: 2,
        difficulty_level: 1
      },
      {
        id: 4,
        options: [
          {
            optionA: 'Baby by Justin Beiber',
            optionB: 'Gangnam Style by Psy',
            optionC: 'Friday by Rebecca Black',
            optionD: 'Famous by Kanye West'
          }
        ],
        text: `What is Lizzos's breakout song called?`,
        question_type: 1,
        image: null,
        answer: 4,
        difficulty_level: 3
      },
      {
        id: 5,
        options: [
          {
            optionA: 'The Gangotras',
            optionB: 'The Charles',
            optionC: 'The Ayoubis',
            optionD: 'The Boyes'
          }
        ],
        text: `What was the name of Melissa Benoist's first husband?`,
        question_type: 4,
        image: null,
        answer: 5,
        difficulty_level: 3
      },
      {
        id: 6,
        options: [
          {
            optionA: 'Yes',
            optionB: 'No',
            optionC: 'All of the above',
            optionD: 'None of the above'
          }
        ],
        text: 'Was Lady Diana a queen?',
        question_type: 4,
        image: null,
        answer: 1,
        difficulty_level: 3
      },
      {
        id: 7,
        options: [
          {
            optionA: 'Stoke broker',
            optionB: 'Stone Cold',
            optionC: `Internet's Boyfriend`,
            optionD: 'Batman'
          }
        ],
        text: `What is Noah Centineo's nick name?`,
        question_type: 1,
        image: null,
        answer: 2,
        difficulty_level: 3
      },
      {
        id: 8,
        options: [
          {
            optionA: 'Gina Rodriguez',
            optionB: 'Amanda Seyfreid',
            optionC: 'Priyanka Chopra',
            optionD: 'Hannah Mae Lee'
          }
        ],
        text: 'Who plays Velma in the new movie Scoob! ?',
        question_type: 1,
        image: null,
        answer: 1,
        difficulty_level: 3
      },
      {
        id: 9,
        options: [
          {
            optionA: 'Closer',
            optionB: 'Goodbyes',
            optionC: 'Die for me',
            optionD: 'Eyes Closed'
          }
        ],
        text: 'Which song made Halsey famous?',
        question_type: 1,
        image: null,
        answer: 1,
        difficulty_level: 3
      },
      {
        id: 10,
        options: [
          {
            optionA: 'Yes',
            optionB: 'No',
            optionC: 'All of the above',
            optionD: 'None of the above'
          }
        ],
        text: 'Is there any vaccine for COVID-19 available yet?',
        question_type: 1,
        image: null,
        answer: 1,
        difficulty_level: 3
      },
      {
        id: 11,
        options: [
          {
            optionA: 'Forensic Medicine and Toxicology',
            optionB: 'Biochemistry',
            optionC: 'Pharmacology',
            optionD: 'Pathology'
          }
        ],
        text: 'What is the worst department to work in ever?',
        question_type: 1,
        image: null,
        answer: 1,
        difficulty_level: 3
      },
      {
        id: 12,
        options: [
          {
            optionA: 'LOL',
            optionB: 'PUBG',
            optionC: 'HOTS',
            optionD: 'DOTA 2'
          }
        ],
        text: 'In which online game is the song \'on my way\' by Alan Walker used?',
        question_type: 1,
        image: null,
        answer: 1,
        difficulty_level: 3
      },
      {
        id: 13,
        options: [
          {
            optionA: 'The Voice',
            optionB: 'X Factor',
            optionC: 'American Idol',
            optionD: 'Pop Idol'
          }
        ],
        text: 'Which show did Kelly Clarkson win?',
        question_type: 4,
        image: null,
        answer: 1,
        difficulty_level: 3
      },
      {
        id: 14,
        options: [
          {
            optionA: 'Triple H',
            optionB: 'Shawn Michaels',
            optionC: 'Dwayne Johnson',
            optionD: 'Edge'
          }
        ],
        text: 'Which wrestler made a comeback in Royal Rumble 2020?',
        question_type: 4,
        image: null,
        answer: 5,
        difficulty_level: 3
      },
      {
        id: 15,
        options: [
          {
            optionA: '100',
            optionB: '50',
            optionC: '49',
            optionD: '70'
          }
        ],
        text: 'How many states are there in USA?',
        question_type: 1,
        image: null,
        answer: 4,
        difficulty_level: 3
      },
      {
        id: 16,
        options: [
          {
            optionA: 'Jake Ryan',
            optionB: 'Blake Jenner',
            optionC: 'Chris Wood',
            optionD: 'Chris Evans'
          }
        ],
        text: 'Who won the first season of the big family cooking showdown?',
        question_type: 1,
        image: null,
        answer: 1,
        difficulty_level: 3
      },
      {
        id: 17,
        options: [
          {
            optionA: 'Carrie Underwood',
            optionB: 'Taylor Swift',
            optionC: 'Leona Lewis',
            optionD: 'Kelly Clarkson'
          }
        ],
        text: 'Who is known as the original American Idol?',
        question_type: 1,
        image: null,
        answer: 5,
        difficulty_level: 3
      },
      {
        id: 18,
        options: [
          {
            optionA: 'Baby by Justin Beiber',
            optionB: 'Gangnam Style by Psy',
            optionC: 'Friday by Rebecca Black',
            optionD: 'Famous by Kanye West'
          }
        ],
        text: 'Which is the most unliked video on youtube?',
        question_type: 1,
        image: null,
        answer: 1,
        difficulty_level: 4
      },
      {
        id: 19,
        options: [
          {
            optionA: 'Billie Eilish',
            optionB: 'Taylor Swift',
            optionC: 'Ariana Grande',
            optionD: 'Lizzo'
          }
        ],
        text: 'Who won the artist of the decade on billboard?',
        question_type: 1,
        image: null,
        answer: 2,
        difficulty_level: 4
      },
      {
        id: 20,
        options: [
          {
            optionA: 'Me',
            optionB: 'Myself',
            optionC: 'I',
            optionD: 'All of the above',
          }
        ],
        text: 'Who is happy that this question task ended?',
        question_type: 4,
        image: null,
        answer: 5,
        difficulty_level: 4
      },
      {
        id: 21,
        options: null,
        text: 'What is 5*3',
        question_type: 7,
        image: null,
        answer: 8,
        difficulty_level: 4
      },
      {
        id: 22,
        options: null,
        text: 'What is 5square',
        question_type: 7,
        image: null,
        answer: 9,
        difficulty_level: 4
      }
    ];
    // this.q.next(temp);
    // this.answerService.populateArray(temp);
    // this.reviewService.populateArray(temp);
  }

  // parse options only if there are options is not null
  checkOptionsNull(question) {
    const q = question;
    // console.log('outside null condition', q);
    if ( q.options !== null && q.options !== undefined && q.options !== [] && q.options[0] !== undefined ) {
      // console.log('inside null condition', q.options);
      return q.options.map( (option, index) => {
        return this.checkQuestionType(option, q.question_type, index);
      });
    }
  }

  // Parse options according to question type
  checkQuestionType(options, questionType, index) {
    // console.log('options', index, questionType, options);
    if (questionType === 2 || questionType === 3) {
      if (index === 0) {
        return {
          optionA: options.optionA,
          optionB: options.optionB,
          optionC: options.optionC,
        };
      } else if (index === 1) {
        return {
          optionA: options.optionD,
          optionB: options.optionE,
          optionC: options.optionF,
        };
      } else if (index === 2) {
        return {
          optionA: options.optionG,
          optionB: options.optionH,
          optionC: options.optionI,
        };
      }
    } else if ( questionType === 1) {
      return {
        optionA: options.optionA,
        optionB: options.optionB,
        optionC: options.optionC,
        optionD: options.optionD,
      };
    } else if ( options[0] === undefined ) {
      return ;
    }
  }
}
