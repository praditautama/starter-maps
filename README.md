# Google Maps Tutorial Menggunakan Ionic2

Tutorial membuat aplikasi hybrid menggunakan Ionic dan Angular2

## Pre-requisite
### Hardware
* Laptop (macOS, Linux, or Windows) dengan akses local administrator
* [Optional] smartphone Android dengan kabel USB 

### Tools
Text Editor sesuai selera. Saya lebih suka Visual Studio Code (macOS, Windows) 
* Visual Studio Code (https://code.visualstudio.com) 
* Atom (https://atom.io)
* VIM

### Android Emulator
* Menggunakan bawaan Android SDK. Cons : berat dan lambat. Pros : sudah include di SDK
* Menggunakan GenyMotion. Pros : lebih ringan dan cepat. Cons : harus download dan menggunakan Oracle VirtualBox. Saya menggunakan GenyMotion. Info di https://www.genymotion.com/

### Libraries
* Java. Download di http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
* Apache ANT. Download di http://ant.apache.org/bindownload.cgi and ikuti cara setupnya di https://www.mkyong.com/ant/how-to-install-apache-ant-on-windows/
* Android SDK. cara lengkap ada di http://www.androidcentral.com/installing-android-sdk-windows-mac-and-linux-tutorial
* Pastikan environment variable **$ANDROID_HOME**, **$ANT_HOME** dan **$JAVA_HOME** sudah ada di **$PATH**

Ketik perintah dibawah ini di command line untuk pastikan **$ANDROID_HOME**, **$ANT_HOME** dan **$JAVA_HOME** sudah ada di **$PATH**

**Windows**
```
echo %PATH%
```
```
echo %ANDROID_HOME%
```
```
echo %ANT_HOME%
```
```
$JAVA_HOME
```

**Linux/macOS**
```
echo $PATH
```
```
echo $ANDROID_HOME
```
```
echo $ANT_HOME
```
```
$JAVA_HOME
```
	
### Core
* Ionic Framework. ikuti caranya di http://ionicframework.com/docs/v2/getting-started/installation/


### Terakhir
Jika semua diatas sudah dilakukan, masuk ke dalam folder direktori project Ionic, lakukan perintah ini di command-line 
```
ionic build android
```
Jika berhasil menjadi APK tanpa error, maka laptop siap untuk development. APK berada di

```
DIRECTORY_IONIC_PROJECT/platforms/android/build/outputs/apk/android-debug.apk
```

Sideload atau install ke Android menggunakan kabel data.

---


# TLDR;
Tutorial ini menghasilkan aplikasi peta menggunakan Google Maps dengan fitur GeoLocation dan menambahkan `marker` hanya dengan tap di peta.
Download aplikasi Androidnya di http://bit.ly/2fkhMKo 

---

# Tutorial Step 1

Perintah command-line di tutorial ini menggunakan Windows, jika menggunakan Linux/macOS diharapkan menyesuaikan seperti tanda "/" atau "\".

Silakan clone repository ini menggunakan perintah dibawah ini di dalam direktori manapun

```
git clone https://gitlab.com/pradita.utama/starter-maps.git
```

Perintah diatas akan mendownload project dan membuat folder bernama **starter-maps**. Masuk kedalam folder tersebut dengan perintah
```
cd starter-maps
```

Project **Step 0** ini belum memiliki library yang dibutuhkan oleh Ionic, kita perlu download semua library menggunakan perintah NPM. **Pastikan Anda memiliki koneksi internet tanpa proxy**. NPM alias Node Packages Manager adalah direktory sekumpulan library, untuk lebih detail tentang NPM bisa Anda pelajari di https://www.npmjs.com/

```
npm install
```

NPM akan menginstall seluruh library yang dibutuhkan oleh Ionic kedalam folder **node_modules**. Jika tidak ada error, coba jalannya project ini di browser menggunakan perintah
```
ionic serve --lab
```

perintah dengan argument `--lab` akan menampilkan aplikasi menjadi tiga tampilan yaitu Android, iOS, dan Windows Phone.

![alt text](https://gitlab.com/pradita.utama/starter-maps/raw/a87e5dc3866bae25b4d529312f1700c1cadb9832/tutorial-images/step0.PNG "ionic serve --lab")

## Menambahkan library Google Maps
Pada tutorial ini kita akan menggunakan library Google Maps V3 Javascript. Informasi lengkap tentang library ini bisa dilihat di ​
https://developers.google.com/maps/documentation/javascript/reference

Pada editor favorit Anda, edit file `index.html` dan tambahkan library seperti di bawah ini
```javascript
...
  
<!-- cordova.js required for cordova apps -->
<script src="http://maps.google.com/maps/api/js?key=AIzaSyA0So2LOCHpDqAFPdNMWWNTSBZEFTj0sqY"></script>
<script src="cordova.js"></script>

...
```

Sebaiknya Anda menggunakan API Key milik sendiri dengan mendaftarkan di https://console.developers.google.com/ . Tapi untuk saat ini gunakan API Key di atas saja.

Kemudian edit file 'home.html' yang berada di direktori `/pages/home` menjadi seperti ini

```html
<ion-header>
  <ion-navbar>
    <ion-title>
      Ini Adalah Peta
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <div #map id="map"></div>
</ion-content>
```

`<div #map id="map"></div>` adalah tempat kita akan menaruh peta kita di aplikasi. Masih di direktori `pages/home`, edit file `home.ts` menjadi

```javascript
import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController } from 'ionic-angular';

declare var google; // deklarasi variable "google" 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef; 
  map: any;
 
  constructor(public navCtrl: NavController) {
 
  }
 
  ionViewDidEnter(){
    this.loadMap();
  }
 
  loadMap(){
 
    let latLng = new google.maps.LatLng(-6.226267, 106.825374);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    google.maps.event.trigger(this.map, 'resize');
 
  }

}
```

**@ViewChild**

Decorator @ViewChild digunakan untuk "mencari" element di HTML yang mempunya nama "#map", dengan @ViewChild kita bisa akses DOM element tersebut dan memanipulasinya setiap saat. @ViewChild harus kita import dari `angular/core`


```javascript
ionViewDidEnter(){
    
}
```
Kode diatas menggunakan `ionViewDidEnter` karena menjamin view saat ini yaitu halaman `home.html` telah sepenuhnya load. Jika kita taruh didalam `constructor` tidak ada jaminan `<div #map id="map"></div>` sudah siap sebelum Google Map load. Jika Google Maps load terlebih dahulu sedangkan `<div #map id="map"></div>` belum load, akan menjadi undefined.

Sekarang, coba jalankan perintah dibawah ini
```
ionic serve --lab
```

Seharusnya aplikasi Anda tidak akan menampilkan peta atau blank. Karena `<div #map id="map"></div>` mempunyai height = 0 dan kita perlu ubah heightnya melalui CSS. Ubah file `home.scss` di dalam folder `pages/home` menjadi seperti dibawah ini
```
.scroll {
    height: 100%;
}
 
#map {
    width: 100%;
    height: 100%;
}
```
Sekarang, coba jalankan perintah dibawah ini lagi
```
ionic serve --lab
```

Aplikasi Anda akan menampilkan peta seperti dibawah ini
![alt text](https://gitlab.com/pradita.utama/starter-maps/raw/7672d3867420a593690a47e3de57b9998b5e711d/tutorial-images/step0-1.PNG "ionic serve --lab")

Step 1 sudah selesai, untuk hasil akhir bisa dibandingkan di branch Step 1 checkout di 
```
git checkout step1
```

## Tutorial Step 2

Coming soon

---

## Tutorial Step 3

Coming soon

---

## Tutorial Step 4

Coming soon

---

## Tutorial Step 5

Coming soon

