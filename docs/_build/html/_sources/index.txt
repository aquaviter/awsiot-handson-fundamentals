=============================
 AWS IoT ハンズオン ~基本編~
=============================

.. toctree::
   :hidden:
   :maxdepth: 2
   :numbered:

   01
   02
   03
   04
   05
   06
   07
   08
   09

本書はAWS IoTおよびAWSの各サービスを利用してIoTの基本的なシステムを構築するためのハンズオン手順 について記述しております。

最新情報
========

-AWS IoTの説明資料を公開しました。 http://bit.ly/1SrHtGf
  
  

前提条件
========
* インテルEdisonまたはRaspberry Piなどの機器で開発経験がある方
* IoTを活用したアプリケーション構築をご検討されているデベロッパーの方
* AWSクラウドを活用したシステム・アプリケーション開発に従事されている方
* UNIXの基本的なコマンドの利用経験がある方

注意事項
========
* AWSのサービス利用料金は受講者の方にご負担いただきますよう、ご了承ください。
* ハンズオンに必要な機材は貸出品となりますので、終了後は必ず返却をお願いします。


事前準備
========
以下のURLから必要なドライバをダウンロードし、インストールをお願いします。

**Windowsの場合**

* `Intel Edisonドライバのインストール <https://s3-ap-northeast-1.amazonaws.com/toshiake-iot-handson/classmethod-devday/tools/win/IntelEdisonDriverSetup1.2.1.exe>`_

* `Windows FTDI ドライバのインストール <http://www.ftdichip.com/Drivers/CDM/CDM%20v2.10.00%20WHQL%20Certified.exe>`_


**MacOSの場合**

* `MacOS FTDI ドライバのインストール <https://s3-ap-northeast-1.amazonaws.com/toshiake-iot-handson/classmethod-devday/tools/mac/FTDIUSBSerialDriver_v2_2_18.dmg>`_


サンプルプログラム
==================

本ハンズオンで利用するサンプルプログラムです。Edison上で利用します。

https://s3-ap-northeast-1.amazonaws.com/awsiot-handson-jp/awsiot-handson-fundamentals.zip


よくあるトラブル
================

**AWS IoTのupdate shadow CLIを実行時にSSLエラーとなる**

python 2.7.10にアップデート、AWS CLIの再インストールでOK。

  
参考情報
========
* `インテル Edisonの初期化とファームアップデート(Win) <http://edison-lab.jp/flash/windows/>`_
* `インテル Edisonの初期化とファームアップデート(MacOS) <http://edison-lab.jp/flash/mac/>`_

ハッシュタグ
============
Twitterのハッシュタグはこちらになります。 **#AWS_IoT_JP**
