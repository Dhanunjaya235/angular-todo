import { Component, OnInit } from '@angular/core';
import { QuoteComponent } from '../quote/quote.component';
import axios from 'axios';
import { API_NINJA_BASE_URL, API_NINJA_X_API_KEY } from '../contants';
import { VoiceToCommandComponent } from '../voice-to-command/voice-to-command.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [QuoteComponent, VoiceToCommandComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  quotes = [];
  private categories: string[] = [
    'age',
    'alone',
    'amazing',
    'anger',
    'architecture',
    'art',
    'attitude',
    'beauty',
    'best',
    'birthday',
    'business',
    'car',
    'change',
    'communication',
    'computers',
    'courage',
    'dating',
    'death',
    'design',
    'dreams',
    'education',
    'environmental',
    'equality',
    'experience',
    'failure',
    'faith',
    'famous',
    'fear',
    'fitness',
    'food',
    'forgiveness',
    'freedom',
    'friendship',
    'funny',
    'god',
    'good',
    'government',
    'graduation',
    'great',
    'happiness',
    'health',
    'history',
    'home',
    'hope',
    'humor',
    'imagination',
    'inspirational',
    'intelligence',
    'jealousy',
    'knowledge',
    'leadership',
    'learning',
    'legal',
    'life',
    'love',
    'marriage',
    'medical',
    'money',
    'morning',
    'success',
  ];

  randomCategory(stringsArray: string[]) {
    const randomIndex = Math.floor(Math.random() * stringsArray.length);

    return stringsArray[randomIndex];
  }

  async fetchQuotesToDisplay() {
    const category = this.randomCategory(this.categories);
    await axios
      .get(API_NINJA_BASE_URL + category, {
        headers: { 'X-Api-Key': API_NINJA_X_API_KEY },
      })
      .then((response) => {
        this.quotes = [...this.quotes, ...response.data] as never[];
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async ngOnInit() {
    for (let index = 0; index < 5; index++) {
      await this.fetchQuotesToDisplay();
    }
  }

  textToSpeech() {
    // Create a new instance of SpeechSynthesisUtterance
    var utterance = new SpeechSynthesisUtterance();
    console.log(speechSynthesis);

    // Set the text to be spoken
    utterance.text = 'Hello, how are you today?';

    // Retrieve available voices
    var voices = speechSynthesis.getVoices();

    // Optionally, filter or select a voice from the available voices
    var selectedVoice = voices.find(
      (voice) => voice.name === 'Google UK English Female'
    );

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    console.log(selectedVoice);

    // Pass the utterance object to the speechSynthesis interface's speak() method
    speechSynthesis.speak(utterance);
  }
}
