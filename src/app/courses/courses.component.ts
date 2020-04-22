import {
  Component, OnInit, ViewChild,
  ViewContainerRef, ComponentFactoryResolver, ComponentRef
} from '@angular/core';
import { DataService } from '../core/services/data.service';
import { ICourses, IPagedResults } from '../shared/interfaces';
import { FilterService } from '../core/services/filter.service';
import { LoggerService } from '../core/services/logger.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  title: string;
  filterText: string;
  courses: ICourses[] = [];
  displayMode: DisplayModeEnum;
  displayModeEnum = DisplayModeEnum;
  totalRecords = 0;
  pageSize = 10;
  mapComponentRef: ComponentRef<any>;
  _filteredCourses: ICourses[] = [];

  get filteredCourses() {
    return this._filteredCourses;
  }

  set filteredCourses(value: ICourses[]) {
    this._filteredCourses = value;
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private dataService: DataService,
    private filterService: FilterService,
    private logger: LoggerService) { }

  ngOnInit() {
    this.title = 'Courses';
    this.filterText = 'Filter Courses:';
    this.displayMode = DisplayModeEnum.Card;

    this.getCourses();
  }

  changeDisplayMode(mode: DisplayModeEnum) {
    this.displayMode = mode;
  }

  pageChanged(page: number) {
    // this.getCoursesPage(page);
  }

  getCourses() {
    this.dataService.getCourses()
      .subscribe((response: ICourses[]) => {
        this.courses = this.filteredCourses = response;
        this.totalRecords = this.courses.length;
      },
        (err: any) => this.logger.log(err),
        () => this.logger.log('getCourses() retrieved courses'));
  }

  filterChanged(data: string) {
    if (data && this.courses) {
      data = data.toUpperCase();
      const props = ['title', 'duration', 'description'];
      this.filteredCourses = this.filterService.filter<ICourses>(this.courses, data, props);
    } else {
      this.filteredCourses = this.courses;
    }
  }

  /* getCoursesPage(page: number) {
    this.dataService.getCoursesPage((page - 1) * this.pageSize, this.pageSize)
      .subscribe((response: IPagedResults<ICourses[]>) => {
        this.courses = this.filteredCourses = response.results;
        this.totalRecords = response.totalRecords;
      },
        (err: any) => this.logger.log(err),
        () => this.logger.log('getCoursesPage() retrieved courses for page: ' + page));
  } */
}

enum DisplayModeEnum {
  Card = 0,
  Grid = 1,
  Map = 2
}

