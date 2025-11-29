import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BasePage} from '../../../components/common/base-page/base-page';
import {CardService} from '../../../services/cards/card-service';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-card-details',
  imports: [
    Card
  ],
  templateUrl: './card-details.html',
  styleUrl: './card-details.scss',
})
export class CardDetails extends BasePage implements OnInit {
  private route = inject(ActivatedRoute);
  private cardService = inject(CardService);
  private cardId = this.route.snapshot.params['id'];

  public ngOnInit() {

  }
}
