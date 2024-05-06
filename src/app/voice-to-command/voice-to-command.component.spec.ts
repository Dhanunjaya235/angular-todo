import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceToCommandComponent } from './voice-to-command.component';

describe('VoiceToCommandComponent', () => {
  let component: VoiceToCommandComponent;
  let fixture: ComponentFixture<VoiceToCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceToCommandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoiceToCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
