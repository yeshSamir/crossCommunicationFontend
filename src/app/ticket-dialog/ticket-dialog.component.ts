import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CityModel, CountryModel, StateModel} from "../../model/location.module";
import {LocationService} from "../location.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {asyncValidator} from "../validators/async-validator";
import {TicketService} from "../ticket-service.service";
import {Router} from "@angular/router";
import {DashboardComponent} from "../dashboard/dashboard.component";


@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.css'],
  animations: [
    trigger('dialogAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('150ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ transform: 'scale(0.5)', opacity: 0 }))
      ])
    ])
  ],
})
export class TicketDialogComponent implements OnInit {
  @Output() ticketSubmitted = new EventEmitter<void>();
  countryLists: CountryModel[] = [];
  pickUpStateLists: StateModel[] = [];
  pickUpCitiesLists: CityModel[] = [];
  deliveryStateLists: StateModel[] = [];
  deliveryCitiesLists: CityModel[] = [];
  locationForm: FormGroup;
  ticketType: string = ''; // Or 'Receive' based on your logic

  constructor(
    public dialogRef: MatDialogRef<TicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private locationService: LocationService,
    private ticketService:TicketService,
    private router: Router,
  ) {
    this.ticketType = data.ticketType;
    this.locationForm = this.fb.group({
      pickupCountry: ['', [Validators.required], [asyncValidator]],
      pickupState: ['', [Validators.required], [asyncValidator]],
      pickupCity: ['', [Validators.required], [asyncValidator]],
      deliveryCountry: ['', [Validators.required]],
      deliveryState: ['', [Validators.required]],
      deliveryCity: ['', [Validators.required]],
      productName: ['', Validators.required],
      productSize: ['', Validators.required],
      productWeight: ['', [Validators.required, Validators.min(0)]],
      notes: ['', [Validators.maxLength(500)]]
    });

  }

  ngOnInit(): void {
    console.log(this.ticketType);
    this.loadCountries();
  }

  loadCountries() {
    this.locationService.getCountries().subscribe({
      next: (res) => {
        if (res.status) {
          this.countryLists = res.countryList;
        }
      },
      error: (err) => {
        console.error('Error fetching country:', err);
        // alert('Failed to Fetch Countries. Please try again.');
      },
    });
  }

  onCountryChange(locationType: string): void {
    console.log(locationType);
    const countryId = this.locationForm?.get(`${locationType}Country`)?.value;
    console.log("Test?: "+countryId);
    if (locationType === 'pickup') {
      this.loadStates(countryId, 'pickup');
    } else {
      this.loadStates(countryId, 'delivery');
    }
  }

  loadStates(countryId: string, locationType: string) {
    this.locationService.getStates(countryId).subscribe({
      next: (res) => {
        if (res.status) {
          if (locationType === 'pickup') {
            this.pickUpStateLists = res.stateList;
          } else {
            this.deliveryStateLists = res.stateList;
          }
        }
      },
      error: (err) => {
        console.error('Error fetching States:', err);
        alert('Failed to Fetch States. Please try again.');
      },
    });
  }

  onStateChange(locationType: string): void {
    const stateId = this.locationForm?.get(`${locationType}State`)?.value;
    if (locationType === 'pickup') {
      this.loadCities(stateId, 'pickup');
    } else {
      this.loadCities(stateId, 'delivery');
    }
  }

  loadCities(stateId: string, locationType: string) {
    this.locationService.getCities(stateId).subscribe({
      next: (res) => {
        if (res.status) {
          if (locationType === 'pickup') {
            this.pickUpCitiesLists = res.citiesList;
          } else {
            this.deliveryCitiesLists = res.citiesList;
          }
        }
      },
      error: (err) => {
        console.error('Error fetching Cities:', err);
        alert('Failed to Fetch Cities. Please try again.');
      },
    });
  }

  submitTicket(): void {
    if (this.locationForm?.valid) {
      const ticketData = {
        ...this.locationForm.value,
        ticketType: this.ticketType  // Add the ticketType
      };
      console.log(ticketData);
      this.ticketService.submitTicket(ticketData).subscribe({
        next: (res) => {
          if (res.status) {
            alert(res.responseMessage)
            console.log('Ticket Submitted:', ticketData);
            this.closeDialog();
            window.location.reload();
          }
        },
        error: (err) => {
          console.error('Error fetching Cities:', err);
          alert('Failed to Fetch Cities. Please try again.');
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}

