import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {trigger, transition, style, animate} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import {LocationService} from "../location.service";
import {CityModel, CountryModel, StateModel} from "../../model/location.module";

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css'],
  animations: [
    trigger('dialogAnimation', [
      transition(':enter', [
        style({transform: 'scale(0.5)', opacity: 0}),
        animate('300ms ease-out', style({transform: 'scale(1)', opacity: 1})),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'scale(0.5)', opacity: 0})),
      ]),
    ]),
  ],
})
export class CreateTicketComponent implements OnInit {
  ngOnInit(): void {
  }

 /* countryLists: CountryModel[] = [];

  pickUpStateLists: StateModel[] = [];
  pickUpCitiesLists: CityModel[] = [];

  deliveryStateLists: StateModel[] = []; // or tickets: TicketResponse | null = null;
  deliveryCitiesLists: CityModel[] = []; // or tickets: TicketResponse | null = null;

  locationForm!: FormGroup;
  ticketForm!: FormGroup;
  ticketType: string = 'Send'; // Or 'Receive' based on your logic

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private locationService: LocationService // Inject the service here
  ) {
  }

  ngOnInit(): void {
    // Initialize the location form
    this.locationForm = this.fb.group({
      pickupCountry: ['', Validators.required],
      pickupState: ['', Validators.required],
      pickupCity: ['', Validators.required],
      deliveryCountry: ['', Validators.required],
      deliveryState: ['', Validators.required],
      deliveryCity: ['', Validators.required]
    });

    // Initialize the ticket form
    this.ticketForm = this.fb.group({
      productName: ['', Validators.required],
      productSize: ['', Validators.required],
      productWeight: ['', [Validators.required, Validators.min(0)]],
      pickupLocation: ['', Validators.required],
      deliveryLocation: ['', Validators.required],
    });

    // Load countries when the component is initialized
    this.loadCountries();
  }

  // Load the list of countries from the backend

  loadCountries() {
    this.locationService.getCountries().subscribe({
      next: (res) => {
        console.log("Response back from Backend for Country");
        if(res.status) {
          console.log("List getting countries");
          this.countryLists = res.countryList;
          console.log(this.countryLists);
        }
      },
      error: (err) => {
        console.error('Error fetching country:', err);
        alert('Failed to Fetch Countries. Please try again.');
      },
    });
  }

  // Handle country selection change
  onCountryChange(locationType: string) {
    const countryId = this.locationForm.get(`${locationType}Country`)?.value;
    if (locationType === 'pickup') {
      this.loadStates(countryId, 'pickup');
    } else {
      this.loadStates(countryId, 'delivery');
    }
  }

  // Load the list of states for a selected country

  loadStates(countryId: string, locationType: string) {
    this.locationService.getStates(countryId).subscribe({
      next: (res) => {
        console.log("Response back from Backend for State");
        console.log(res.stateList);
        if(res.status) {
          console.log("List getting list of States");
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


  // Handle state selection change
  onStateChange(locationType: string) {
    const stateId = this.locationForm.get(`${locationType}State`)?.value;
    if (locationType === 'pickup') {
      this.loadCities(stateId, 'pickup');
    } else {
      this.loadCities(stateId, 'delivery');
    }
  }


  loadCities(stateId: string, locationType: string) {
    this.locationService.getCities(stateId).subscribe({
      next: (res) => {
        console.log("Response back from Backend for Cities");
        console.log(res.stateList);
        if(res.status) {
          console.log("List getting list of Cities");
          if (locationType === 'pickup') {
            this.pickUpCitiesLists = res.citiesList;
          } else {
            this.deliveryCitiesLists = res.citiesList;
          }
        }
      },
      error: (err) => {
        console.error('Error fetching States:', err);
        alert('Failed to Fetch States. Please try again.');
      },
    });
  }


  submitTicket(): void {
    if (this.ticketForm.valid) {
      const ticketData = this.ticketForm.value;
      // Call your service to submit the ticket data here
      console.log('Ticket Submitted:', ticketData);
      this.closeDialog();
    } else {
      console.log('Form is invalid');
    }
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }*/
}
