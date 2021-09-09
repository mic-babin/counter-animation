

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';


  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
  })

export class AppComponent implements OnInit, AfterViewInit {
  title = "Counter animation with angular"

  
  cAnimated:boolean = false;
  dAnimated:boolean = false;
  @ViewChild("a") a: any;
  @ViewChild("b") b: any;
  @ViewChild("c") c: any;
  @ViewChild("d") d: any;

  constructor(elRef: ElementRef ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    this.animateValue(this.a, 0, 2021, 1500);
    this.animateValue(this.b, 0, 16, 1500);
    
    // Animate value c when scrolling
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 250) {
        if(this.cAnimated == false){
          this.animateValue(this.c, 0, 2300, 1500);
          this.animateValue(this.d, 0, 3, 1500);
          this.cAnimated = true;
          }}
    })

    // Animate value d when scrolling
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 500) {
        if(this.dAnimated == false){
          this.animateValue(this.d, 0, 3, 1500);
          this.dAnimated = true;
          }}
    })
  }

 animateValue(obj, start, end, duration){
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.nativeElement.innerHTML = Math.floor(progress * (end - start) + start)
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  } 

}
