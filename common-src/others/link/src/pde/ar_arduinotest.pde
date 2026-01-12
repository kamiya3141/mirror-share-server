import processing.serial.*;

Serial serialPort; // Arduinoにデータを送るシリアルポート
boolean firstContact = false;  //Arduinoからのはじめの送信を確認する

byte[] inByte = new byte[3]; // 受信データ用バッファ

int oval;
int add_oval = 15, oval_min = 15, oval_max = 125;
int mouseButtonFlag = 0;
int mouseButtonMinusValue = 37, mbLeftFlagIndex = 1, mbRightFlagIndex = 2;

void setup() {
  size(400, 400);
  String portName = Serial.list()[2]; // 使用するシリアルポート名
  serialPort = new Serial(this, portName, 9600);
  serialPort.buffer(inByte.length); // 読み込むバッファの長さをの指定

  oval = 70;
}

void draw() {
  background(220);
  fill(0);
  text("Output port: " + oval, 10, 100);
  
  // めんどくさかったのでchatgptに int -> binary-string の変換プログラムの作成を依頼
  String bin_flag = String.format("0b%5s", Integer.toBinaryString(mouseButtonFlag)).replace(' ', '0');
  
  text("Current Flag: " + bin_flag, 10, 200);
}

// シリアルポートにデータが受信されると呼び出されるメソッド
void serialEvent(Serial port) {
  inByte = port.readBytes();

  if(firstContact == false) {
    if(inByte[0] == 'C') { // Arduinoとの接続確認
      port.clear();
      firstContact = true;
    } 
  }
}

// シリアルポートにサーボの値を送るメソッド
void sendServo(int id)
{
  if(!firstContact) return;
  if ((mouseButtonFlag & 1 << id) != 0 || mouseButtonFlag == 0) {
	  oval = (int)constrain(oval, oval_min, oval_max);
	  serialPort.write((byte)'S');
	  serialPort.write((byte)id);
	  serialPort.write((byte)oval);
  }
}

// https://qiita.com/drken/items/7c6ff2aa4d8fce1c9361 を参照


void mouseReleased(MouseEvent event) {
    int mouse_value = (int)event.getButton() - mouseButtonMinusValue;
    mouse_value = mouse_value < 1 ? 1 : mouse_value;
    mouseButtonFlag &= ~(1 << mouse_value);
}

void mousePressed(MouseEvent event) {
    int mouse_value = (int)event.getButton() - mouseButtonMinusValue;
    mouse_value = mouse_value < 1 ? 1 : mouse_value;
    mouseButtonFlag |= (1 << mouse_value);
}
void mouseWheel(MouseEvent event) {
  oval += (add_oval * (int)event.getCount());
  sendServo(mbLeftFlagIndex);
  sendServo(mbRightFlagIndex);
}
