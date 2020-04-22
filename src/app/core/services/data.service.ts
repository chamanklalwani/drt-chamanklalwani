import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ICourses, IPagedResults, IApiResponse } from '../../shared/interfaces';

@Injectable()
export class DataService {
    port = '4243';
    baseUrl = `${this.window.location.protocol}//${this.window.location.hostname}:${this.port}`;
    coursesBaseUrl = this.baseUrl + '/courses';

    constructor(private http: HttpClient, @Inject('Window') private window: Window) {
    }

    getCoursesPage(page: number, pageSize: number): Observable<IPagedResults<ICourses[]>> {
        return this.http.get<ICourses[]>(
            `${this.coursesBaseUrl}/page/${page}/${pageSize}`,
            { observe: 'response' })
            .pipe(
                map(res => {
                    const totalRecords = +res.headers.get('X-InlineCount');
                    const courses = res.body as ICourses[];
                    return {
                        results: courses,
                        totalRecords: totalRecords
                    };
                }),
                catchError(this.handleError)
            );
    }

    /**
     * returns list of all courses
     */
    getCourses(): Observable<ICourses[]> {
        return this.http.get<ICourses[]>(this.coursesBaseUrl)
            .pipe(
                map(courses => {
                    return courses;
                }),
                catchError(this.handleError)
            );
    }

    /**
     * returns details of specific course
     * @param id course id to fetch details for
     */
    getCourse(id: number): Observable<ICourses> {
        return this.http.get<ICourses>(this.coursesBaseUrl + '/' + id)
            .pipe(
                map(course => {
                    return course;
                }),
                catchError(this.handleError)
            );
    }

    /**
     * Add course object to the courses collection
     * @param course course object to add
     */
    addCourse(course: ICourses): Observable<ICourses> {
        return this.http.post<ICourses>(this.coursesBaseUrl, course)
            .pipe(catchError(this.handleError));
    }

    /**
     * updates specified course object
     * @param course updated course object
     */
    updateCourse(course: ICourses): Observable<boolean> {
        return this.http.put<IApiResponse>(this.coursesBaseUrl + '/' + course.id, course)
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }

    /**
     * deletes specified course object from courses collection
     * @param id course id to delete
     */
    deleteCourse(id: number): Observable<boolean> {
        return this.http.delete<IApiResponse>(this.coursesBaseUrl + '/' + id)
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'unexpected error');
    }
}
