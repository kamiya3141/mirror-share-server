# ・第一回

自室のネットワーク環境についてまとめました。

<details>
<summary>なぜ「-1」？</summary>

> どーせすぐに構成が変わるからなのさ

</details>
::: note warn
本記事で出てきた
言葉・プログラム・技術・ハードウェア、そしてそれをもとにした行動
（2026/05/23 時点）
は、ネット記事、ChatGPTが生成した説明文章によって理解したつもりになっている
アマチュア（私）によるものです。
100%その用語や行動が正しいわけではないことを承知の上でお読みください
:::

## 主に使用した技術やハードウェア

* OpenWRT
<details open>
1. x86_64 PC (L3-SW-0)
<details open>
<summary>スペック</summary>
<ul>
<li>CPU: Intel core2 duo e7500</li>
<li>RAM: 2GB * 2</li>
<li>STORAGE: SD-CARD 32GB</li>
</ul>
</details>
1. WHR-2533-DHP (L2-SW-0)
1. WSR-1166-DHP (L2-SW-1)
1. WN-AC-1600-DGR3 (L2-SW-2)
</details>
* VLAN
<details open>
 1. ID = 5	|	mgmt		|	192.168.10.1/24
 1. ID = 6	|	srv			|	192.168.20.1/24
 1. ID = 50	|	wired		|	192.168.50.1/24
 1. ID = 60	|	wireless	|	192.168.60.1/24
</details>
