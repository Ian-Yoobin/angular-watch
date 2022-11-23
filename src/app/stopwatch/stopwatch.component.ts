import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnDestroy {
  hrs:number =0;
  mins:number =0;
  counter:any;
  running: boolean=false;
  timerRef: any;
  startText: string="Start";
  startTime:any;

  startTimer(){
    this.running=!this.running;

    if (this.running) {
      this.startText = 'Stop';
      this.startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = (Date.now() - this.startTime)/1000;
        if(this.counter%60===0){
          this.mins++;
          this.startTime=Date.now()- (this.counter || 0);
          this.counter = (Date.now() - this.startTime)/1000;
        }
      });
    } else {
      this.startText = 'Resume';
      clearInterval(this.timerRef);
    }

  }

  clearTimer() {
    this.running = false;
    this.startText = 'Start';
    this.counter = undefined;
    clearInterval(this.timerRef);
  }


  ngOnDestroy(): void {

    clearInterval(this.timerRef);
  }

}
