import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { VoiceRecognitionService } from '../services/voice-recognition.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'voice-to-command',
  standalone: true,
  imports: [],
  templateUrl: './voice-to-command.component.html',
  styleUrl: './voice-to-command.component.scss',
})
export class VoiceToCommandComponent implements OnInit {
  public voiceService: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.voiceService = inject(VoiceRecognitionService);
      this.voiceService.init();
      this.voiceService.setCallback(() => {
        if (this.voiceService.text) {
          console.log('stop will navigate', this.voiceService.text);
          console.log(
            this.voiceService.text.trim().startsWith('navigate to') ||
              this.voiceService.text.trim().startsWith('go to'),
            this.voiceService.text.trim()
          );
          if (
            this.voiceService.text.trim().startsWith('navigate to') ||
            this.voiceService.text.trim().startsWith('go to') ||
            this.voiceService.text.trim().startsWith('get to') ||
            this.voiceService.text.trim().startsWith('to')
          ) {
            // const route = `/${this.text.split(' ')[2]}`;
            console.log('navitaing to contact', this.voiceService.text);
            this.router.navigate(['/todoform']);
            this.voiceService.setIsNaviagetdUsingVoice(true);
          }
        }
      });
    }
  }

  ngOnInit(): void {}

  startService() {
    if (this.voiceService) {
      this.voiceService.start();
    } else {
      alert('Open The Site In Browser');
    }
  }

  stopService() {
    if (this.voiceService) {
      this.voiceService.stop();
    } else {
      alert('Open The Site In Browser');
    }
  }
}
