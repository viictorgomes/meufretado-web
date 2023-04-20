export const VisaCardnumber = (inputtxt : string) =>
{
    var cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    return cardno.test(inputtxt);
}

export const MasterCardnumber = (inputtxt : string) =>
{
    var cardno = /^(?:5[1-5][0-9]{14})$/;
    return cardno.test(inputtxt);
}
  
  
export const CreditCardFlag = (cardNumber : string) =>
{
    var cardType : string = '';
    if (VisaCardnumber(cardNumber.replace(/\s/g, '')))
      cardType = "visa";
    else if (MasterCardnumber(cardNumber.replace(/\s/g, '')))
      cardType = "mastercard";
      
    return cardType;
}