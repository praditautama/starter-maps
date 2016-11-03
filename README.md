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

Sideload atau install ke Android menggunakan kabel data atau bisa langsung download di http://bit.ly/2fkhMKo 


# Tutorial Step 0

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

