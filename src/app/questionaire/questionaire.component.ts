import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Questions } from '../DataTypes.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-questionaire',
  standalone: true,
  imports: [ NgFor, ReactiveFormsModule , FormsModule],
  templateUrl: './questionaire.component.html',
  styleUrl: './questionaire.component.css'
})
export class QuestionaireComponent implements OnInit{

  ngOnInit(): void {
    this.addCreds();
  }
  

  form: FormGroup;
  ListQuestion : any[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      questions: this.fb.array([]),
    });
  }
  
  get questions () {
    return this.form.get('questions') as FormArray;
  }

  addCreds() {
    this.questions.push( new FormControl<string>(''))
  }
  

  publish(){
    console.log(this.questions.value)

    const newArray = [];

    for(let question of this.questions.value ){
      const list : any = {
        question,
      }

      newArray.push(list)
    }

    this.ListQuestion = newArray;

    console.log(this.ListQuestion)
  }
  
  adjustTextareaHeight(event: any): void {
    const textarea: HTMLTextAreaElement = event.target;
    textarea.style.height = 'auto'; // Reset the height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the new height
  }

  addToList(){
     this.addCreds();
  }

  remove(index : number) {

    if (index > -1 && index < this.questions.value.length && this.questions.value.length !== 1) {
      this.questions.removeAt(index);
      console.log(index)
    }
  }

  trackByFn(index: any, item: Questions) {
    return index; // or item.id if each item has a unique id
  }


}
