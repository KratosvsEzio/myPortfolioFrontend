import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material"
import { portfolioData } from '../../Models/portfolioData.model';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {

  project: portfolioData;

  constructor(
    private dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) project
  ) {
    this.project = project;
  }

  ngOnInit() {
  }
  save() {
    // this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }
}
