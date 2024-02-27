import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { VISME_FORM_SCRIPT } from '../contants';
@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadVismeFormsScript();
    }
  }

  loadVismeFormsScript() {
    const scriptElement = document.createElement('script');
    scriptElement.src = VISME_FORM_SCRIPT;
    document.body.appendChild(scriptElement);
  }
}

