export interface CustomDateValidator{
    isDate:Boolean
}

export interface PaymentInterface {
    id:Number,
    fullName: String;
    cardNumber: Number;
    expiary: String;
    cvv: Number;
    amount: Number;
}