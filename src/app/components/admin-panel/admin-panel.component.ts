import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  adminForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              ) { }

  ngOnInit() {
    this.adminForm = this.formBuilder.group({
      action: ['category']
    });
  }

  get f() { return this.adminForm.controls; }

}
