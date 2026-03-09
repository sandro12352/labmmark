import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './contact.html',
    styleUrl: './contact.css',
})
export class ContactComponent {
    formData = signal({
        name: '',
        email: '',
        message: '',
    });

    submitted = signal(false);

    onSubmit() {
        this.submitted.set(true);
        setTimeout(() => this.submitted.set(false), 3000);
    }
}
