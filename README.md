# BrainFuck

BrainFuckとはコンパイラが出来るだけ小さくなるようにと研究されて開発されたプログラミング言語処理系である。
Node.jsの学習を目的として、Node.jsを利用して開発した。

## 言語仕様

Wikipediaにある通りなので、省略する。
[Brainfuck(Wikipedia)](https://ja.wikipedia.org/wiki/Brainfuck)
このプログラムでは、tokensに一意に判別可能なtokenを設定することで、好きな文字列をtokenとして利用することができる。

## How to use
```
# 前準備
git clone https://github.com/282Haniwa/MyBrainFuck.git
cd MyBrainFuck
yarn install

# インタプリタモードで起動
npm run start -- -i
# or
yarn start -i

# ファイルを指定して実行
npm run start -- source/HelloWorld.b
# or
yarn start source/HelloWorld.b
```

インタプリタモードでは何も入力せずにエンターを入力することで、一通りのプログラムが入力されたとして、実行されます。
exitを入力することで、インタプリタモードを終了させることができます。
