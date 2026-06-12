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
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      user_mobile: [''],
      message: ['', Validators.required]
    });
  }

  private showNotification(message: string, type: 'success' | 'error' = 'success'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
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
          this.showNotification('Email sent successfully!', 'success');
          this.contactForm.reset(); 
        } else {
          const errData = await response.json().catch(() => ({}));
          console.log('FAILED...', errData.error || response.statusText);
          this.showNotification(errData.error || 'Failed to send email. Please try again.', 'error');
        }
      })
      .catch((error) => {
        console.log('FAILED...', error);
        this.showNotification('Failed to send email. Please try again.', 'error');
      });
    } else {
      this.showNotification('Please fill out the form correctly.', 'error');
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
