## snappfood-conflict-finder
ابزاری برای پیدا کردن اشتباه در محاسبات مالیات بر ارزش افزوده اسنپ فود 


## How it works

You need to pass your current authorization token of snappfood website. 
In order to find the token you need to open developer tools in any browser you are working with and take on of `xhr` requests in network 
tab and copy the `authorization`  header value from headers.


برای استفاده از این پکیج نیاز است که توکن دسترسی خود را از وبسایت اسنپ فود بدست آورده و به عنوان ورودی به این پکیج پاس بدهید. 
برای بدست آوردن توکن دسترسی می توانید کلید `F12` را در مرورگر خود بزنید و به تب `netowrk` رفته و یکی از درخواست هایی که از دامنه اسنپ فود هستند را برداشته و توکن `authorization` آن را کپی کنید.


![Help](/help.png)

## How to run

به جهت این که احتمالا این مشکل باقی نخواهد ماند پکیج ای در `npm` برای این کار اختصاص ندادم. اما با دریافت کد پکیج و باز کردن آن با ابزاری مانند `vscode` می توانید آن باز کنید. 


`cd path-to-package`

`npm i`

`Fill the token.txt with your token`

`node index.js`

## Example

اگر همه چیز خوب پیش برود خروجی ای مانند زیر خواهید دید


![Help](/example.png)

