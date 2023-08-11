import { Component, ViewChild } from '@angular/core';
import { advantages } from './constants/advantages';
import { services } from './constants/services';
import { contacts } from './constants/contacts';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { Toast } from './toasts/toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('orderSwal')
  public orderSwal!: SwalComponent;
  navigation = [
    {
      value: 'Преимущества',
      scroll: '#advantages',
    },
    {
      value: 'Услуги',
      scroll: '#services',
    },
    {
      value: 'Контакты',
      scroll: '#contacts',
    },
  ];
  advantages = advantages;
  services = services;
  contacts = contacts;
  title = 'alexander-services';
  order = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    phone: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(
          /(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g
        ),
      ],
    }),
    haveWhatsApp: new FormControl<boolean>(false, {
      nonNullable: true,
    }),
  });
  loading: boolean = false;
  constructor(private service: AppService) {}
  ngOnInit() {
    this.service.get().subscribe((res) => res);
  }
  submit() {
    this.loading = true;
    this.service.send(this.order.getRawValue()).subscribe({
      next: () => {
        Toast.fire({ icon: 'success', title: 'Заявка успешно создана' });
      },
      error: () => {
        Toast.fire({
          icon: 'error',
          title: 'Упс, ошибка',
          text: 'Скоро мы её поправим',
        });
      },
      complete: () => {
        this.order.reset();
        this.loading = false;
      },
    });
  }
}
