import { Component, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

      fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailParams)
      })
      .then(async (response) => {
        if (response.ok) {
          console.log('SUCCESS!');
          alert('Email sent successfully!');
          this.contactForm.reset(); 
        } else {
          const errData = await response.json().catch(() => ({}));
          console.log('FAILED...', errData.error || response.statusText);
          alert('Failed to send email. Please try again.');
        }
      })
      .catch((error) => {
        console.log('FAILED...', error);
        alert('Failed to send email. Please try again.');
      });
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
