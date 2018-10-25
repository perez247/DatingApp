import { ToasterService } from 'src/app/_services/toaster.service';
import { Injectable, Component } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { componentFactoryName } from '@angular/compiler';

@Injectable()

export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
    constructor(private toaster: ToasterService) {}

    canDeactivate(component: MemberEditComponent) {
        if (component.editMember.dirty) {
            return confirm('Are you sure want to continue? Any unsaved changes will be lost');
            // return this.toaster.confirm('Are you sure want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}
