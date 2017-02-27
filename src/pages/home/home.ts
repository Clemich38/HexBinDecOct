import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage
{

  public binStr: string;
  public hexStr: string;
  public decStr: string;
  public octStr: string;
  public errorMsg: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController)
  {
    this.binStr = "1";
    this.hexStr = "1";
    this.decStr = "1";
    this.octStr = "1";
    this.errorMsg = "";
  }

  // Convert the new received value into all the other formats
  // value: String to Convert
  // from: value base (2: binary, 8: octal, 10: decimal, 16: hexadecimal)
  private Convert(value, from)
  {
    
  // Remove spaces
  value = value.split(' ').join('');

    if (parseInt(value, from) <= Number.MAX_SAFE_INTEGER)
    {
      this.binStr = this.AddSpaces(parseInt(value, from).toString(2), 4);
      this.hexStr = this.AddSpaces(parseInt(value, from).toString(16), 4);
      this.decStr = this.AddSpaces(parseInt(value, from).toString(10), 3);
      this.octStr = parseInt(value, from).toString(8);
      this.errorMsg = "";
    }
    else if (value)
    {
      this.errorMsg = "Number is to big!";
      this.showAlert();
    }
    else
      this.errorMsg = "";
  }

  // Add space in string for it to be easily readable
  // binStr: Original string
  // Size of the character groups
  private AddSpaces(binStr, size): string
  {
    var length = binStr.length;

    for (var i = length; i > size; i -= size)
    {
      binStr = binStr.slice(0, i - size) + " " + binStr.slice(i - size, binStr.length);
    }
    
    return binStr;
  }


  get binModel() {
    return this.binStr;
  }

  set binModel(value)
  {
    this.Convert(value, 2);
  }

  get hexModel() {
    return this.hexStr;
  }

  set hexModel(value)
  {
    this.Convert(value, 16);
  }

  get decModel() {
    return this.decStr;
  }

  set decModel(value)
  {
    this.Convert(value, 10);
  }

  get octModel()
  {
    return this.octStr;
  }

  set octModel(value)
  {
    this.Convert(value, 8);
  }

  private showAlert() {
    let alert = this.alertCtrl.create({
      title: this.errorMsg,
      subTitle: '',
      buttons: ['OK']
    });
    alert.present();
  }
}
