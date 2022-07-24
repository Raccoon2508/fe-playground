import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeArticleComponent } from './about-me-article.component';

describe('AboutMeArticleComponent', () => {
  let component: AboutMeArticleComponent;
  let fixture: ComponentFixture<AboutMeArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutMeArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMeArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
