import { Injectable } from '@angular/core';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root',
})
export class VoiceRecognitionService {
  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords: any;
  private isNavigatedUsingVoice = false;

  private callbackFunction: () => void = () => {};

  setCallback(callback: () => void) {
    this.callbackFunction = callback;
  }

  setIsNaviagetdUsingVoice(value: boolean) {
    this.isNavigatedUsingVoice = value;
  }
  getIsNaviagetdUsingVoice() {
    return this.isNavigatedUsingVoice;
  }
  init() {
    this.recognition.interimResults = true;
    this.recognition.continuous = true;
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', (e: any) => {
      console.log('result event listener', e);
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(transcript, 'transcript');
    });
  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    setTimeout(() => {
      this.stop();
    }, 6000);
    console.log('Speech recognition started');
    this.recognition.addEventListener('end', () => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log('End speech recognition');
      } else {
        this.wordConcat();
        this.recognition.start();
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat();
    this.recognition.stop();
    console.log('End speech recognition');

    typeof this.callbackFunction === 'function' && this.callbackFunction();
  }

  wordConcat() {
    console.log('wordconcat');
    this.text = this.text + ' ' + (this.tempWords ?? '');
    this.tempWords = '';
  }
}
