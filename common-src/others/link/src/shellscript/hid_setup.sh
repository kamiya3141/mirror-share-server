#!/bin/bash

set -e

# ルートディレクトリ作成
sudo mkdir -p /sys/kernel/config/usb_gadget/keyboard
cd /sys/kernel/config/usb_gadget/keyboard

# 基本情報
echo 0x1d6b > idVendor
echo 0x0104 > idProduct
echo 0x0100 > bcdDevice
echo 0x0200 > bcdUSB

# 文字列情報
mkdir -p strings/0x409
echo "1234567890" > strings/0x409/serialnumber
echo "Raspberry Pi" > strings/0x409/manufacturer
echo "HID Keyboard" > strings/0x409/product

# コンフィグ情報
mkdir -p configs/c.1/strings/0x409
echo "Config 1" > configs/c.1/strings/0x409/configuration
echo 120 > configs/c.1/MaxPower

# HID機能
mkdir -p functions/hid.usb0
echo 1 > functions/hid.usb0/protocol
echo 1 > functions/hid.usb0/subclass
echo 8 > functions/hid.usb0/report_length
echo -ne \\x05\\x01\\x09\\x06\\xa1\\x01\\x05\\x07\\x19\\xe0\\x29\\xe7\\x15\\x00\\x25\\x01\\x75\\x01\\x95\\x08\\x81\\x02\\x95\\x01\\x75\\x08\\x81\\x03\\x95\\x05\\x75\\x01\\x05\\x08\\x19\\x01\\x29\\x05\\x91\\x02\\x95\\x01\\x75\\x03\\x91\\x03\\x95\\x06\\x75\\x08\\x15\\x00\\x25\\x65\\x05\\x07\\x19\\x00\\x29\\x65\\x81\\x00\\xc0 > functions/hid.usb0/report_desc

# シンボリックリンクでコンフィグに追加
ln -s functions/hid.usb0 configs/c.1/


# --- Consumer Control HID ---
mkdir -p functions/hid.usb1
# プロトコル0, サブクラス0, レポート長1バイト
echo 0 > functions/hid.usb1/protocol
echo 0 > functions/hid.usb1/subclass
echo 1 > functions/hid.usb1/report_length

# Consumer Control用レポートディスクリプタ
# Volume Up/Down, Play/Pause のみの例
echo -ne \
'\x05\x0C' \  # Usage Page (Consumer)
'\x09\x01' \  # Usage (Consumer Control)
'\xA1\x01' \  # Collection (Application)
'\x15\x00' \  # Logical Minimum 0
'\x25\x01' \  # Logical Maximum 1
'\x09\xE9' \  # Usage (Volume Up)
'\x09\xEA' \  # Usage (Volume Down)
'\x09\xCD' \  # Usage (Play/Pause)
'\x75\x01' \  # Report Size 1
'\x95\x03' \  # Report Count 3
'\x81\x02' \  # Input (Data,Var,Abs)
'\xC0' > functions/hid.usb1/report_desc

# コンフィグにリンク
ln -s functions/hid.usb1 configs/c.1/


# --- System Control HID ---
mkdir -p functions/hid.usb2
# プロトコル0, サブクラス0, レポート長1バイト
echo 0 > functions/hid.usb2/protocol
echo 0 > functions/hid.usb2/subclass
echo 1 > functions/hid.usb2/report_length

# System Control用レポートディスクリプタ
# Power, Sleep, Wake Up
echo -ne \
'\x05\x01' \  # Usage Page (Generic Desktop)
'\x09\x80' \  # Usage (System Control)
'\xA1\x01' \  # Collection (Application)
'\x85\x01' \  # Report ID 1
'\x05\x01' \  # Usage Page (Generic Desktop)
'\x09\x82' \  # Usage (Sleep)
'\x09\x81' \  # Usage (Power)
'\x09\x83' \  # Usage (Wake Up)
'\x15\x00' \  # Logical Minimum 0
'\x25\x01' \  # Logical Maximum 1
'\x75\x01' \  # Report Size 1
'\x95\x03' \  # Report Count 3
'\x81\x02' \  # Input (Data,Var,Abs)
'\xC0' > functions/hid.usb2/report_desc

# コンフィグにリンク
ln -s functions/hid.usb2 configs/c.1/


# UDC 有効化
ls /sys/class/udc > UDC
