import {Component, input} from '@angular/core';

@Component({
  selector: 'app-labeled-input',
  imports: [],
  templateUrl: './labeled-input.html',
  styleUrl: './labeled-input.scss',
})
export class LabeledInput {
  public label = input.required<string>();
  public class = input<string>('');
}
