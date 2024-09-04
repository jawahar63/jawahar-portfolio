import { Component, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from 'emailjs-com';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {environment} from "../../../../srcenvironmentsenvironment.development"
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    emailjs.init(environment.pubkey);

    this.contactForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      user_mobile: [''],
      message: ['', Validators.required]
    });
  }

  public sendEmail(event: Event): void {
    event.preventDefault();

    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      
      const emailParams = {
        user_name: formData.user_name,
        user_email: formData.user_email,
        user_mobile: formData.user_mobile,
        message: formData.message
      };

      emailjs.send(
        environment.emailservice,   
        environment.emailtemp,      
        emailParams                 
      ).then(
        () => {
          console.log('SUCCESS!');
          alert('Email sent successfully!');
          this.contactForm.reset(); 
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
          alert('Failed to send email. Please try again.');
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }
  isHeightGreaterThan640: boolean = false;

  ngOnInit() {
    this.checkHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkHeight();
  }

  checkHeight() {
    this.isHeightGreaterThan640 = window.innerHeight > 640;
  }
}
