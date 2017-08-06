# Google Maps Tutorial Menggunakan Ionic2

NOTE: 
This is outdated repo / tutorial

Tutorial membuat aplikasi hybrid menggunakan Ionic dan Angular2. 
Level : Beginner

Tutorial Version : 1.1

Author : hello@praditautama.com

## Indeks
* [Step 1 - Create Blank Project and Add Google Maps Library](#tutorial-step-1)
* [Step 2 - Marker](#tutorial-step-2)
* [Step 3 - Info Window](#tutorial-step-3)
* [Step 4 - GeoLocation](#tutorial-step-4)
* [Step 5 - Add Dynamic Marker On Tap](#tutorial-step-5)
* [Step 6 - Build Android and iOS](#tutorial-step-6)
* [Bonus](#bonus)
* [Cheat Sheet](#cheat-sheet-perintah-ionic-yang-sering-dipakai)
* [Useful Links](#useful-links)

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
ionic start coba-aplikasi blank --v2
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

Source code final ada di branch `step5`

https://gitlab.com/pradita.utama/starter-maps/tree/step5

```
git checkout step5
```

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

Project **Step 0** ini belum memiliki library yang dibutuhkan oleh Ionic, kita perlu download semua library menggunakan perintah NPM. **Pastikan Anda memiliki koneksi internet tanpa proxy**. NPM alias Node Packages Manager adalah direktori library, untuk lebih detail tentang NPM bisa Anda pelajari di https://www.npmjs.com/

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
...

import { Component, ViewChild, ElementRef } from '@angular/core';

...
```

```javascript
ionViewDidEnter(){
    
}
```
Kode diatas menggunakan `ionViewDidEnter` karena menjamin view saat ini yaitu halaman `home.html` telah sepenuhnya load. Jika kita taruh didalam `constructor` tidak ada jaminan `<div #map id="map"></div>` sudah siap sebelum Google Map load. Jika Google Maps load terlebih dahulu sedangkan `<div #map id="map"></div>` belum load, akan menjadi undefined.

Sekarang, coba jalankan perintah dibawah ini


### Mengubah Tampilan Peta
```javascript
...

let mapOptions = {
  center: latLng,
  zoom: 15,
  mapTypeId: google.maps.MapTypeId.ROADMAP
}
    
...
```
variable `mapOptions` mempunyai banyak sekali option dan konfigurasi, bisa dilihat di https://developers.google.com/maps/documentation/javascript/reference#MapOptions
Jika ingin menampilkan peta dengan tampilan berbeda, bisa gunakan website generator berikut ini dan copy semua optionnya ke `mapOptions`

https://snazzymaps.com/


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

Di step 2 ini kita akan menambahkan sedikit fitur di aplikasi kita, ya itu bisa menambahkan `marker` atau **tanda** di peta. 

Edit file `home.html` di folder `pages/home`. Ubah script HTML menjadi seperti dibawah ini

```html
<ion-header>
  <ion-navbar>
    <ion-title>
      Ini Adalah Peta
    </ion-title>
    <ion-buttons end>
      <button ion-button (click)="addMarker()"><ion-icon name="add"></ion-icon></button>
    </ion-buttons>  
  </ion-navbar>
</ion-header>

<ion-content>
  <div #map id="map"></div>
</ion-content>
```

Perhatikan script HTML dibawah ini

```html
<ion-buttons end>
  <button ion-button (click)="addMarker()"><ion-icon name="add"></ion-icon></button>
</ion-buttons>  
```
Kita menambahkan tombol pada header aplikasi mengunakan `<button ion-button></button>` dan memberikan fungsi / action pada tombol tersebut dengan `(click)="addMarker()"`

Tanda `()` adalah untuk handling event dari template ke javascript-nya (home.ts) alias `input`. Jika kita mengharapkan `output` kita gunakan `[]`. Di jaman Angular versi 1, terkenal dengan namanya **two-way data binding**, jadi jika ada perubahan pada scope template maka ada berubah pada modelnya, juga sebaliknya. Nah, di Angular2 **two-way data binding** menggunakan sintaks `[()]` yang berarti input-ouput. 

Lebih jelasnya bisa dipelajari lebih lanjut di https://angular.io/docs/ts/latest/guide/template-syntax.html#!#binding-syntax

Pada tombol di atas, kita menambahkan fungsi `addMarker()`. Karena itu kita harus menambahkan fungsi tersebut di `home.ts`. Edit `home.ts` dan tambahkan seperti ini

```javascript
addMarker(){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
  }
```
Fungsi di atas memanggil salah satu Class di Google Maps API yaitu `Markers`. Parameter dan option Class `Markers` bisa Anda lihat di https://developers.google.com/maps/documentation/javascript/reference#MarkerOptions

Pada fungsi `addMarker()` di atas, kita hanya menempatkan posisi `marker` pada tengah-tengah layar aplikasi menggunakan method `getCenter()`. 

Full-code akan menjadi seperti dibawah ini
```javascript
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
declare var google;

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

  addMarker(){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
  }

}
```

Coba jalankan aplikasinya di browser dengan menggunakan perintah `ionic serve --lab`. Jika `ionic serve` masih berjalan sebelumnya, tidak perlu mengetik `ionic serve` kembali karena perubahan di kode akan otomatis terlihat di browser. 

Coba klik pada tombol `addMarker` dan `marker` akan muncul pada peta.

---

## Tutorial Step 3

Pada step 3 ini kita menambakan fitur kecil, yaitu menampilkan jendela informasi ketika `marker` kita tap / klik.

Tambahkan kode berikut di `home.ts`

```javascript
addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
  
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  
  }
```
dan ubah fungsi `addMarker()`, tambahkan kode berikut

```javascript
addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Disini itu apa?</h4>";          
 
    this.addInfoWindow(marker, content);
  }
```

full-code akan menjadi seperti dibawah ini
```javascript
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
declare var google;

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

  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Disini itu apa?</h4>";          
 
    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
  
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  
  }

}
```
Jalankan kembali dan lihat perubahan di browser. Coba klik pada tombol `addMarker` dan `marker` akan muncul pada peta dan coba klik markernya, akan keluar pop up informasi.

---

## Tutorial Step 4

Pada step 4 ini, kita akan mendeteksi posisi koordinat aplikasi kita menggunakan GPS, cool bukan? :p

Sebelumnya, kita tambahkan **plugin ionic native** dengan perintah dibawah ini dan jalan lupa butuh koneksi internet untuk download plugin.
```
ionic add plugin cordova-plugin-geolocation
```
Kumpulan plugin native untuk ionic bisa Anda lihat di http://ionicframework.com/docs/v2/native/

Jika plugin `cordova-plugin-geolocation` sudah berhasil diunduh. Kita ubah sedikit template HTML dengan menambahkan tombol satu lagi disebelah kiri dan tambahkan fungsi `getLocation()`

```html
<ion-header>
  <ion-navbar>
    <ion-buttons start>
      <button ion-button (click)="getLocation()"><ion-icon name="navigate"></ion-icon></button>
    </ion-buttons>
    <ion-title>
      Ini Adalah Peta
    </ion-title>
    <ion-buttons end>
      <button ion-button (click)="addMarker()"><ion-icon name="add"></ion-icon></button>
    </ion-buttons>  
  </ion-navbar>
</ion-header>

<ion-content>
  <div #map id="map"></div>
</ion-content>

```
Dokumentasi tentang komponen `button` ini bisa Anda lihat di http://ionicframework.com/docs/v2/components/#buttons

Template sudah kita tambahkan tombol, saatnya kita tambahkan fungsi di `home.ts`. Copas kode dibawah ini dan tambahkan di `home.ts`

```javascript
getLocation(){
    let locationOptions = {timeout: 10000, enableHighAccuracy: true};
    
    Geolocation.getCurrentPosition(locationOptions).then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map.panTo(latLng);
    }, (error) => {
      console.log('tidak dapat koordinat GPS');
      console.log(error);
    });
    
  }
```

full-code akan menjadi seperti dibawah ini
```javascript
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;

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

  getLocation(){
    let locationOptions = {timeout: 10000, enableHighAccuracy: true};
    
    Geolocation.getCurrentPosition(locationOptions).then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map.panTo(latLng);
    }, (error) => {
      console.log('tidak dapat koordinat GPS');
      console.log(error);
    });
    
  }

  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Disini itu apa?</h4>";          
 
    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
  
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  
  }

}
```
Jalankan di browser untuk mencoba, tekan tombol di header untuk mendapatkan posisi koordinat
### Perhatian
Ada kalanya tidak berhasil mendapatkan koordinat GPS, ada beberapa penyebabnya
* Di dalam ruangan
* Menggunakan Wifi
* Tidak menggunakan localhost

---

## Tutorial Step 5

Oke, step terakhir di tutorial ini. Fitur baru di aplikasi kita adalah menambahkan `marker` dengan hanya tap di peta.

Kita akan menggunakan Google Maps Events yaitu `onclick`. List semua events di Google Maps bisa di cek di https://developers.google.com/maps/documentation/javascript/reference
Search dengan `cmd + f` (macOS) atau `ctrl + f` dan masukkan "events".

Edit file `home.ts` dan tambahkan sedikit kode berikut di dalam `loadMap()`
```javascript
google.maps.event.addListener(this.map, 'click', (event) => {
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: event.latLng
      });
    });
```

full-code seperti dibawah ini
```javascript
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
declare var google;

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

    google.maps.event.addListener(this.map, 'click', (event) => {
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: event.latLng
      });
    });


    google.maps.event.trigger(this.map, 'resize');
 
  }

  getLocation(){
    let locationOptions = {timeout: 10000, enableHighAccuracy: true};
    
    Geolocation.getCurrentPosition(locationOptions).then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map.panTo(latLng);
    }, (error) => {
      console.log('tidak dapat koordinat GPS');
      console.log(error);
    });
    
  }

  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Disini itu apa?</h4>";          
 
    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
  
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  
  }

}
```
Jalankan di browser Anda dan coba tap pada peta. Cool, isn't? 

---
## Tutorial Step 6
Ini adalah the best part dari tutorial ini, kita akan membuat aplikasi Android dalam bentuk APK!

Jika **pre-requisite** sudah diinstall semua dan kita siap membuat APK.
Ketik perintah dibawah untuk membuat APK
```
ionic build android
```

Jika Anda memakai Mac dan sudah menginstall XCode terbaru, ketik perintah
```
ionic build ios
```
Ingat, iOS hanya bisa dilakukan di Mac. Kita tidak bisa membuat aplikasi iOS di Windows atau Linux. Tapi Mac bisa membuat semua aplikasi.

Setelah melakukan perintah di atas, tunggu sejenak dan pastikan tidak ada error. Hasil APK akan berada di
```
C:\PATH_KE_FOLDER\starter-maps\platforms\android\build\outputs\apk\android-debug.apk
```
Copy APK tersebut ke Android dan coba jalankan. Selamat! Anda sudah berhasil membuat aplikasi Android menggunakan Google Maps.
Hasil akhir aplikasi bisa diunduh di http://bit.ly/2fkhMKo

---

## BONUS
Bagaimana jika kita tidak bisa atau tidak ada Android SDK dan ingin mencoba aplikasi yang kita buat di Android atau iPhone? bisa gak ya?

BISA!

Gunakan fitur Ionic View. Download aplikasi Ionic View di
* Google Play Store https://play.google.com/store/apps/details?id=com.ionic.viewapp&hl=en
* AppStore  https://itunes.apple.com/us/app/ionic-view/id849930087?mt=8

Install di Android atau iPhone Anda, lakukan pendaftaran melalui Aplikasi Ionic View atau melalui website www.ionic.io

Jika sudah mendaftar, pada folder project Anda lakukan perintah dibawah ini
```
ionic upload
```

Masukkan email dan password Ionic View (ionic.io) anda di command line dan tunggu aplikasi Anda diunggah ke server Ionic.

Jika sudah selesai, buka aplikasi Ionic View di Android dan iPhone kemudian login. Aplikasi Anda akan tampil pada list di Ionic View. Tap saja dan pilih "View App".

Aplikasi ionic Anda sekarang bisa diuji coba di Android dan iOS tanpa perlu lakukan Build.

---

#### Catatan Tentang Ionic View
* Tidak semua plugin Ionic Native disupport di dalam Ionic View
* Setiap Anda melakukan perintah `ionic upload` dan perubahan di Ionic View tidak ada, lakukan clear data pada menu ionic View dan lakukan download ulang dengan memilih "View App"
* Anda bisa membagikan Aplikasi dengan mencatat AppID pada Ionic View. Berikan AppID tersebut kepada teman yang sudah menginstall Ionic View. Tap pada icon "mata" dan masukkan AppID.
* Ionic View ini berguna jika Anda ingin melakukan Prototyping tanpa perlu melakukan Build


## Cheat Sheet Perintah Ionic Yang Sering Dipakai
### Membuat project ionic baru. Pilih template salah satu antara BLANK (kosong), TABS, atau SIDEMENU
```
ionic start <NAMA_APLIKASI> blank/tabs/sidemenu --v2
```

### Menampilkan di browser
```
ionic serve --lab
```

### Menambahkan plugin
```
ionic plugin add <NAMA_PLUGIN>
```

### Membuat binary aplikasi (pilih salah satu Android, iOS, atau Windows Phone)
```
ionic build android/ios/windows
```

### Menampilkan aplikasi di Emulator
```
ionic emulate android/ios
```

### Upload ke Aplikasi Ionic View
```
ionic upload
```

## Useful Links
* Git Repo for current session https://www.github.com/praditautama/starter-maps
* Google Developer Console https://console.developers.google.com/
* Google Maps Style Wizards https://snazzymaps.com/
* Google Maps V3 Javascript Reference https://developers.google.com/maps/documentation/javascript/reference
* Ionic2 Documentation http://ionicframework.com/docs/v2/
* Angular2 Documentation https://angular.io/
* Belajar singkat Angular2 http://learnangular2.com/
