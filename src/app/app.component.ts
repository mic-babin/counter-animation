import { AfterViewInit, Component, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'Counter animation with angular';

  cAnimated: boolean = false;
  dAnimated: boolean = false;

  // Accessing DOM elements with ViewChild
  @ViewChild('a') a: any;
  @ViewChild('b') b: any;
  @ViewChild('c') c: any;
  @ViewChild('d') d: any;

  constructor(private render: Renderer2) {}

  // ngAfterViewInit is called after the view is initially rendered. @ViewChild() depends on it. You can't access view members before they are rendered.
  ngAfterViewInit() {
    // Calling the first two animations
    this.animateValue(this.a, 0, 2021, 1500);
    this.animateValue(this.b, 0, 16, 1500);

    // Create a scrolling event using Renderer2
    this.render.listen('window', 'scroll', () => {
      // Get element c position
      let cPosition = this.c.nativeElement.getBoundingClientRect();

      // Compare it with the height of the window
      if (cPosition.top >= 0 && cPosition.bottom <= window.innerHeight) {
        // if it has not been animated  yet, animate c
        if (this.cAnimated == false) {
          this.animateValue(this.c, 0, 2300, 1500);

          // prevent animation from running again
          this.cAnimated = true;
        }
      }
      // Get element d position
      let dPosition = this.d.nativeElement.getBoundingClientRect();

      // Compare it with the height of the window
      if (dPosition.top >= 0 && dPosition.bottom <= window.innerHeight) {
        // if it has not been animated  yet, animate d
        if (this.dAnimated == false) {
          this.animateValue(this.d, 0, 3, 1500);

          // prevent animation from running again
          this.dAnimated = true;
        }
      }
    });
  }

  // Counter animation fucntion
  animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = timestamp => {
      //  Set the actual time
      if (!startTimestamp) startTimestamp = timestamp;
      // Calculate progress (the time versus the set duration)
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Calculate the value compared to the progress and set the value in the HTML
      obj.nativeElement.innerHTML = Math.floor(
        progress * (end - start) + start
      );
      // If progress is not 100%, an call a new animation of step
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    // Call a last animation of step
    window.requestAnimationFrame(step);
  }
}
