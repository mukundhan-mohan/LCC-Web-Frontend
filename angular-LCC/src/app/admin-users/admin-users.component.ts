import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { CommonModule, NgFor } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
declare var $ :any;
@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent, AdminHeaderComponent, FormsModule, NgFor],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent {

  status = true;
  public successmsg = false;
  public warningmsg = false;
  public errormsg = false;
  public successMsgCnt : any = [];
  public data : any = [];
  public editData : any = [];
  myForm: any = FormGroup ;
  eventDetails = {
    fName: '',
    lName: '',
    info: '',
    position: '',
    contactDetails: '',
    username: '',
  };

  eventEditDetails: any = {
    fName: '',
    lName: '',
    info: '',
    position: '',
    contactDetails: '',
    username: '',
  };
  constructor(private auth: AuthService,
              public api : ApiService){
    this.getAllUser();
  }
  addToggle()
  {
    this.status = !this.status;       
  }

  addEvent()
  {
    $("#add-event-modal").modal('show');
    this.addToggle();
  }

  submitForm(form: any): void {
    if (form.valid) {
      console.log('Form data:', this.eventDetails);
      this.api.dPost('addUser', this.eventDetails).subscribe((res : any) => {  
        console.log(res);
        $("#add-event-modal").modal('hide');
        this.getAllUser()
        form.resetForm();
        this.successmsg = true;
        this.successMsgCnt = "New Event is Added"
        let that = this;
        setTimeout(function() {
          that.successmsg = false;
          that.successMsgCnt = "";
          console.log(that.successmsg);
        }.bind(this), 3000);
      }, error => { console.log(error); alert("something goes wrong. Please refresh and try again!") });
    console.log();
    }
  }

  getAllUser(){
    this.api.dGet('getAllUser').subscribe((res : any) => {
          console.log(res);
        //  this.pS = false;
         this.data = res;
        //  this.data.content = this.domSanitizer.bypassSecurityTrustHtml(this.data.content);
      }, error => { console.log(error); });
  }

  closeModal(){
    $("#add-event-modal").modal('hide');
    $("#edit-event-modal").modal('hide');
    $("#action-event-modal").modal('hide');
  }

  selectRow(id: any){
    console.log(id);
    $("#action-event-modal").modal('show');
    $("#editOrDeleteEvent").val(id);

  }

  deletModal(){
    $("#delete-event-modal").modal('show')
    var dval = $("#editOrDeleteEvent").val();
    $("#confrmDeleteEvent").val(dval);
  }

  closeDeletModal(){
    $("#delete-event-modal").modal('hide')
  }

  deletEvent(){
    var cnfrmDelEveId = $("#confrmDeleteEvent").val();
    console.log(cnfrmDelEveId);
    this.api.dDelete('deleteUser', cnfrmDelEveId).subscribe(
      () => {
        console.log('Item deleted successfully');
        $("#delete-event-modal").modal('hide')
        $("#action-event-modal").modal('hide');
        this.getAllUser()
        this.successmsg = true;
        this.successMsgCnt = "Event is deleted Successfully"
        let that = this;
        setTimeout(function() {
          that.successmsg = false;
          that.successMsgCnt = "";
          console.log(that.successmsg);
        }.bind(this), 3000);
      },
      error => {
        console.error('Error deleting item:', error);
      }
    );
  }

  editModal(){
    $("#edit-event-modal").modal('show')
    var dval = $("#editOrDeleteEvent").val();
    this.editData = this.data.find((item: { id: { S: string } }) => item.id.S === dval);
    console.log(this.editData)
    $("#editEventsId").val(this.editData.id.S);
    this.myForm.setValue({
      fName: this.editData.fName.S,
      lName: this.editData.lName.S,
      info: this.editData.info.S,
      position: this.editData.position.S,
      contactDetails: '',
      username: this.editData.username.S,
    });
    // $("#confrmDeleteEvent").val(dval);
  }

  updateEventsForm(form: any): void {
    var cnfrmUpdstaeEveId = $("#editEventsId").val();
    console.log(this.myForm.value);
    if (form.valid) {
      console.log('Form data:', this.myForm.value);
      this.api.dUpdate('updateUser', this.myForm.value, cnfrmUpdstaeEveId).subscribe((res : any) => {  
        console.log(res);
        $("#edit-event-modal").modal('hide');
        $("#action-event-modal").modal('hide');
        this.getAllUser()
        this.successmsg = true;
        this.successMsgCnt = "Event is Updated Successfully"
        let that = this;
        setTimeout(function() {
          that.successmsg = false;
          that.successMsgCnt = "";
          console.log(that.successmsg);
        }.bind(this), 3000);
      }, error => { console.log(error); alert("something goes wrong. Please refresh and try again!") });
    console.log();
    }
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      fName: new FormControl(''),
      info: new FormControl(''),
      lName: new FormControl(''),
      position: new FormControl(''),
      contactDetails: new FormControl(''),
      username: new FormControl(''),
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('Message', form.value.message);
  }

}
