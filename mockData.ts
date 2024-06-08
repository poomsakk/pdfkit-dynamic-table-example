import { TInput } from './gen-bill';

const mockData: TInput = {
  billingNo: 'PCX-150',
  billingDate: '2021-09-01 12:00:00',
  customerName: 'John Doe',
  customerTel: '1234567890',
  purchaseDetails: [
    {
      productCode: 'PD-001',
      productName: 'Laptop',
      quantity: 1,
      pricePerUnit: 300,
    },
    {
      productCode: 'PD-003',
      productName: 'Keyboard',
      quantity: 12,
      pricePerUnit: 1234,
    },
    {
      productCode: 'PD-0XX3',
      productName: 'Cat with a hat on a mat with a bat eating a rat',
      quantity: 1,
      pricePerUnit: 1420,
    },
    {
      productCode: 'PD-0SDS3',
      productName:
        'House with a mouse eating a louse on a blouse in a douse with a spouse in a grouse with a carouse',
      quantity: 1,
      pricePerUnit: 100,
    },
    {
      productCode: 'PD-0XX3',
      productName: 'Telephone',
      quantity: 1,
      pricePerUnit: 100,
    },
    {
      productCode: 'PD-0XX3',
      productName: 'Banana boat',
      quantity: 1,
      pricePerUnit: 100,
    },
    {
      productCode: 'PD-0XX3',
      productName:
        'Speaker with a beaker on a seeker in a meeker with a leaker on a bleaker in a sneaker with a tweaker in a reeker with a deeker ',
      quantity: 1,
      pricePerUnit: 100,
    },
    {
      productCode: 'PD-0XX3',
      productName:
        'A very long product name that should be wrapped in the table cell',
      quantity: 1,
      pricePerUnit: 100,
    },
    {
      productCode: 'PD-0XX3',
      productName: 'Product 1',
      quantity: 4,
      pricePerUnit: 444,
    },
    {
      productCode: 'PD-0XX3',
      productName: 'Product 2',
      quantity: 2,
      pricePerUnit: 33333,
    },
    {
      productCode: 'PD-0XX3',
      productName: 'Product 3',
      quantity: 13,
      pricePerUnit: 23,
    },
    {
      productCode: 'PD-0XX3',
      productName:
        'Example product name that should be wrapped in the table cell',
      quantity: 2,
      pricePerUnit: 23133,
    },
    {
      productCode: 'PD-0XX3',
      productName:
        'Very very very very very very very very very very very very very very very very very very very long product name that should be wrapped in the table cell',
      quantity: 4,
      pricePerUnit: 4423,
    },
    {
      productCode: 'PD-0XX3',
      productName: 'Product 4',
      quantity: 1,
      pricePerUnit: 123,
    },
  ],
  discount: 1000,
  totalAmountBeforeDiscount: 149850,
  totalAmountAfterDiscount: 148850,
};

export default mockData;
