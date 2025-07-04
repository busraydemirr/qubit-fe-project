import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { CalendarA11y, CalendarDateFormatter, CalendarEvent, CalendarEventTitleFormatter, CalendarModule, CalendarUtils, CalendarView, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Subject } from 'rxjs';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { MatButtonModule } from '@angular/material/button';
import { BnCreditCardService } from '../../services/bn-credit-card.service';
import { TimePeriodEnum } from '../../models/shared/time-period.enum';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CsCardService } from '../../services/cscard.service';
import { renderCurrencyCode } from '../../utils/enum.utils';
import { SubSink } from 'subsink';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  imports: [
    MatButtonModule,
    CalendarModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    NgIf,
    MatProgressSpinner,
  ],
  providers: [
    {
      provide: DateAdapter,
      useFactory: adapterFactory,
    },
    CalendarDateFormatter,
    CalendarUtils,
    CalendarA11y,
    CalendarEventTitleFormatter
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | any;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  public timePeriod: TimePeriodEnum = TimePeriodEnum.MONTH;

  public modalData: {
    action: string;
    event: CalendarEvent;
  } | any = {};

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  public timePeriodEnum = TimePeriodEnum;
  public calendarLoading: boolean = false;
  public subsink = new SubSink();

  constructor(private modal: NgbModal, private _creditService: BnCreditCardService, private _csCardService: CsCardService, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.viewData(this.timePeriod);
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'sm' });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  public viewData(data: TimePeriodEnum): void {
    this.activeDayIsOpen = false;
    this.timePeriod = data;
    this.calendarLoading = true;

    this.subsink.sink = forkJoin([this._creditService.getDueCredits(this.timePeriod), this._csCardService.getPromissoryNote(this.timePeriod),])
      .subscribe(([res1, res2]) => {
        if (res1.data) {
          this.events = res1.data.items.map((item) => {
            return {
              start: new Date(item.duedate),
              end: new Date(item.duedate),
              title: `${item.creditName} - ${item.inttotal} ${renderCurrencyCode(item.currency)} (${item.linenr}. taksit)`,
              color: colors.red,
              allDay: true,
            };

          });
        }

        if (res2.data) {
          this.events = this.events.concat(res2.data.csCards.items.map((item2: any) => {
            let docType = "";
            if (item2.doc === 1) {
              docType = "Müşteri Çeki";
            } else {
              docType = "Pimak Çeki";
            }

            return {
              start: new Date(item2.duedate),
              end: new Date(item2.duedate),
              title: `${docType} - ${item2.owing} - ${item2.amount}`,
              color: colors.blue,
              allDay: true,
            };
          }
          ));
        }
        this.calendarLoading = false;
        this.cdr.detectChanges();
      });
  }
}
