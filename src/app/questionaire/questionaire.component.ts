import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Questions } from '../DataTypes.interface';
import { NgFor } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { AuthenticatedUser, QuestionData } from '../constants';
import { CrudService } from '../services/crud/crud.service';

@Component({
  selector: 'app-questionaire',
  standalone: true,
  imports: [ NgFor, ReactiveFormsModule , FormsModule],
  templateUrl: './questionaire.component.html',
  styleUrl: './questionaire.component.css'
})
export class QuestionaireComponent implements OnInit{

  // ngOnInit(): void {
  //   this.getUser();
  //   this.QuestionForm = this.auth.getQuestionId();
  //   this.GetAllQuestions();

  //   this.kForm = this.fb.group({
  //     abouts: this.fb.control(''),
  //     contactsArray: this.fb.array([])
  //   });   

  //   if(this.QuestionForm !== null) {
  //     this.kForm.controls['abouts'].setValue(this.QuestionForm.about);
  //   } else {
  //     this.kForm.controls['abouts'].setValue('');
  //   }
  // }

  // QuestionForm! : QuestionData;
  
  // about! : string;

  // ListQuestion : any[] = [];
  // QuestionToBeSent! : QuestionData;
  
  constructor(private fb: FormBuilder, private auth : AuthService, private router : Router, private crud : CrudService) {
    
  }
  
  // kForm!: FormGroup;
  // info: any;


  // get contacts(): FormArray {
  //   return <FormArray>this.kForm.get('contactsArray');
  // }


  // addContact(contact: any) {
  //   this.contacts.controls.push(this.createContactGroup(contact));
  // }

  // addNewContact() {
  //   this.addContact({ id: '', question: '', questionId: '',});
  // }

  // createContactGroup(contact: any): FormGroup {
  //   return this.fb.group({  
  //     id: [contact.id, [Validators.required]],
  //     question: [contact.question, [Validators.required]],
  //     questionId: [contact.questionId, [Validators.required]],
  //   })
  // }

  // noDBData : boolean = false;

  // GetAllQuestions() {
  //   const questionId = this.auth.getQuestionId().id;
  
  //   if (questionId !== null) {
  //     this.crud.getAllQuestionOfQuestion(questionId).subscribe({
  //       next: (n: any) => {
  //       this.ListQuestion = n;
  //       console.log(this.ListQuestion)
  //     },
  //     complete: () => {
  //       console.log('List Updated!');
  //       this.ListQuestion.forEach((contact:any) => {
  //         this.addContact(contact)
  //       })
  //       }
  //     });
  //   }
  // }
  

  

  // publish(questions : any){
  //   console.log(questions)

  //   console.log(this.QuestionToBeSent)

  //   if(this.auth.getQuestionId() === null || undefined) {
  //     this.crud.AddQuestion(this.QuestionToBeSent).subscribe({
  //       next: (n : any) => {
  //         this.auth.saveDataToSession('question_details', n)
  //       },
  //       complete: () => {
  //         this.AddQuestionToMain(questions.contactsArray);
  //       }
  //     })
  //   } else {
  //     this.AddQuestionToMain(questions.contactsArray)
  //   }
    
  // }



  // AddQuestionToMain(questions : any){

  //   console.log(questions);
  //   this.crud.sendBulkRequests(questions).subscribe({
  //     next: (n : any) => {
  //       console.log(n);
  //     },
  //     complete: () => {
  //       alert('Completed');
  //     }
  //   });
  // }
  
  adjustTextareaHeight(event: any): void {
    const textarea: HTMLTextAreaElement = event.target;
    textarea.style.height = 'auto'; // Reset the height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the new height
  }


  // addToList(){
  //    this.addNewContact();
  // }

  remove(index : number) {

    if (index > -1 && index < this.contacts.value.length && this.contacts.value.length !== 1) {
      this.contacts.removeAt(index);
      console.log(index)
    }
  }

  // trackByFn(index: any, item: Questions) {
  //   return index; // or item.id if each item has a unique id
  // }

  // // User Id

  // logout(){
  //   this.auth.clearSession();
  //   this.router.navigate(['']);
  //   window.location.reload();
  // }

  noUser!: boolean;

  userData! : AuthenticatedUser | null;

  getUser(){
    if(this.auth.getUser() == null){
      this.noUser = false;
    } else {
      this.noUser = true;
      this.userData = this.auth.getUser();
    }
  }

  profileInitial(){
   return this.auth.getUser()?.name.charAt(0);
  }

  information = [
    {
      name: "lamar",
      email: "lamar@gmail.com",
      phone: "023232349403",
      country: "USA"
    },
    {
      name: "John doe",
      email: "johndoe@gmail.com",
      phone: "023232349403",
      country: "canada"
    },
    {
      name: "mavis",
      email: "mavis@gmail.com",
      phone: "023232349403",
      country: "London"
    }
  ];

  kForm!: FormGroup;
  info: any;


  get contacts(): FormArray {
    return <FormArray>this.kForm.get('contactsArray');
  }

  ngOnInit() {
    this.auth.getUser()
    this.kForm = this.fb.group({
      contactsArray: this.fb.array([])
    });
    this.info = this.information;
    this.info.forEach((contact:any) => {
      this.addContact(contact)
    })
  }

  addContact(contact: any) {
    this.contacts.push(this.createContactGroup(contact));
  }

  addNewContact() {
    this.addContact({ name: null, email: null, phone: null, country: null});
  }

  createContactGroup(contact: any): FormGroup {
    return this.fb.group({  
      name: [contact.name, [Validators.required]],
      email: [contact.email, [Validators.required]],
      phone: [contact.phone, [Validators.required]],
      country: [contact.country, [Validators.required]]
    })
  }

  submitContact(contact:any) {
    alert('Contact submitted: ' + JSON.stringify(contact));
    console.log(this.kForm.value)
  }
}


