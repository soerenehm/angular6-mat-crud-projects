import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {ProjectService} from '../../shared/project.service';
import {EditMode} from '../../shared/editmode.model';
import {Project} from '../../shared/project.model';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, OnChanges {
  projectForm: FormGroup;
  @Input() selectedIndex: number;
  @Input() editMode;
  @Output() editModeChange = new EventEmitter<string>();
  customers: string[];

  constructor(private projectService: ProjectService) {
    this.projectForm = new FormGroup({
      'task': new FormControl('', Validators.required),
      'operations': new FormControl('', Validators.required),
      'customer': new FormControl('', Validators.required),
      'duration': new FormControl('', Validators.required),
      'technics': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.customers = this.projectService.getCustomers();
  }

  ngOnChanges() {
    if (this.editMode === EditMode.Update) {
        const selectedProject = this.projectService.getProject(this.selectedIndex);
        this.initForm(this.projectForm, {
          task: selectedProject.task,
          operations: selectedProject.operations,
          customer: selectedProject.customer,
          duration: selectedProject.duration,
          technics: selectedProject.technics
        });
    } else if (this.editMode === EditMode.Add) {
        this.initForm(this.projectForm, {task: '', operations: '', customer: 'Telekommunikation', duration: '', technics: ''});
    }
  }

  onCancel() {
    this.projectForm.reset();
    this.editModeChange.emit(EditMode.Undefined);
  }

  onSubmit() {
    const newProject = this.projectForm.value;
    if (this.editMode === EditMode.Update) {
      this.projectService.updateProject(this.selectedIndex, newProject);
    } else {
      this.projectService.addProject(newProject);
    }
    this.onCancel();
  }

  initForm(projectForm: FormGroup, project: Project): void {
    projectForm.setValue({
      task: project.task,
      operations: project.operations,
      customer: project.customer,
      duration: project.duration,
      technics: project.technics
    });
  }

  isEditModeDefined() {
    return (this.editMode !== EditMode.Undefined);
  }
}
