import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DataService } from '../../core/services/data.service';
import { ModalService, IModalContent } from '../../core/modal/modal.service';
import { GrowlerService, GrowlerMessageType } from '../../core/growler/growler.service';
import { LoggerService } from '../../core/services/logger.service';

import { ICourse, DurationUnit } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

  course: ICourse = {
    id: 0,
    title: '',
    duration: 1,
    'duration-unit': DurationUnit.Days,
    description: '',
  };
  // enum variable for Course Duration Units
  durationUnit = DurationUnit;
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText = 'Insert';
  @ViewChild('courseForm', { static: true }) courseForm: NgForm;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private growler: GrowlerService,
    private modalService: ModalService,
    private logger: LoggerService) { }

  ngOnInit() {
    // Subscribe to params so if it changes we pick it up. Don't technically need that here
    // since param won't be changing while component is alive.
    // Could use this.route.parent.snapshot.params["id"] to simplify it.
    this.route.parent.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id !== 0) {
        this.operationText = 'Update';
        this.getCourse(id);
      }
    });
  }

  getCourse(id: number) {
    this.dataService.getCourse(id).subscribe((course: ICourse) => {
      this.course = course;
    });
  }

  submit() {
    if (this.course.id === 0) {
      this.dataService.addCourse(this.course)
        .subscribe((insertedcourse: ICourse) => {
          if (insertedcourse) {
            // Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
            this.courseForm.form.markAsPristine();
            this.growler.growl('Course inserted successfully.', GrowlerMessageType.Success);
            this.router.navigate(['/courses']);
          } else {
            const msg = 'Unable to insert course';
            this.growler.growl(msg, GrowlerMessageType.Danger);
            this.errorMessage = msg;
          }
        },
          (err: any) => this.logger.log(err));
    } else {
      this.dataService.updateCourse(this.course)
        .subscribe(() => {
          // Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
          this.courseForm.form.markAsPristine();
          this.growler.growl('Course updated successfully.', GrowlerMessageType.Success);
          this.router.navigate(['/courses']);
        },
          (err: any) => this.logger.log(err));
    }
  }

  cancel(event: Event) {
    event.preventDefault();
    // Route guard will take care of showing modal dialog service if data is dirty
    this.router.navigate(['/courses']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteCourse(this.course.id)
      .subscribe(() => {
        this.growler.growl('Course deleted successfully.', GrowlerMessageType.Success);
        this.router.navigate(['/courses']);
      },
        (err) => this.logger.log(err));
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (!this.courseForm.dirty) {
      return true;
    }

    // Dirty show display modal dialog to user to confirm leaving
    const modalContent: IModalContent = {
      header: 'Lose Unsaved Changes?',
      body: 'You have unsaved changes! Would you like to leave the page and lose them?',
      cancelButtonText: 'Cancel',
      OKButtonText: 'Leave'
    };
    return this.modalService.show(modalContent);
  }

}
