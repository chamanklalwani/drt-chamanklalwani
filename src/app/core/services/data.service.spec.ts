import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing'
import { ICourses } from 'src/app/shared/interfaces';

describe('DataService', () => {
    let service: DataService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [DataService]
        });
        service = TestBed.get(DataService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('be able to retrieve courses from the API bia GET', () => {
        const dummyCourses: ICourses[] = [
            {
                "id": 1,
                "title": "Modern Web Development",
                "duration": 5,
                "duration-unit": "day",
                "description": "HTML5, CSS3, ES6/JS and more"
            },
            {
                "id": 2,
                "title": "Git",
                "duration": 3,
                "duration-unit": "day",
                "description": "Git and GitHub"
            },
            {
                "id": 3,
                "title": "Python",
                "duration": 5,
                "duration-unit": "day",
                "description": "Intro to Python"
            },
            {
                "id": 4,
                "title": "Java",
                "duration": 5,
                "duration-unit": "day",
                "description": "Intro to Java"
            },
            {
                "id": 5,
                "title": "Node.js",
                "duration": 5,
                "duration-unit": "day",
                "description": "Intro to Node.js"
            }
        ];
        service.getCourses().subscribe(courses => {
            expect(courses.length).toBe(5);
            expect(courses).toEqual(dummyCourses);
        });
        const request = httpMock.expectOne("http://localhost:4243/courses");
        expect(request.request.method).toBe('GET');
        request.flush(dummyCourses);
    });

    afterEach(() => {
        httpMock.verify();
    });
});