import { Component, ViewChild, ElementRef } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from 'emailjs-com';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
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
    event.preventDefault(); // Prevent default form submission

    if (this.contactForm.valid) {
      // Collect form data
      const formData = this.contactForm.value;
      
      // Prepare email data
      const emailParams = {
        user_name: formData.user_name,
        user_email: formData.user_email,
        user_mobile: formData.user_mobile,
        message: formData.message
      };

      emailjs.send(
        environment.emailservice,   // Your EmailJS service ID
        environment.emailtemp,      // Your EmailJS template ID
        emailParams                 // The email parameters object
      ).then(
        () => {
          console.log('SUCCESS!');
          alert('Email sent successfully!');
          this.contactForm.reset(); // Reset the form after submission
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
}
