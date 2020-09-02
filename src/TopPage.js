import React, { useEffect, useState } from "react";
const Tops = () => {
  return (
    <body>
      <div>
        <div className="container">
          <br></br>
          <article class="message is-dark">
            <section className="section">
              <div class="message-header">
                <p>このサイトについて</p>
              </div>
              <div class="message-body">
                このサイトは、日本に落ちた隕石のオープンデータを用い、日本地図上に実際に落ちた場所を描画し、可視化したサイトである。上記のMAPタブに2020年9月2日現在までのデータが示されている。
                <br></br>使用したデータ⇨
                <a href="https://www.kahaku.go.jp/research/db/science_engineering/inseki/inseki_list.html">
                  https://www.kahaku.go.jp/research/db/science_engineering/inseki/inseki_list.html
                </a>
              </div>
            </section>
          </article>
          <article class="message is-dark">
            <section className="section">
              <div class="message-header">
                <p>隕石ページの描画</p>
              </div>
              <div class="message-body">
                過去861年から現在に至るまでの日本に落ちた隕石の位置を描画している.隕石一つ一つのデータがjsonファイルに格納されており,内訳は
                <strong>
                  名前,落下場所,年月日,種類,総重量 (kg),個数,緯度,経度
                </strong>
                である.その中で使用するデータは
                <div class="content">
                  <ol type="1">
                    <li>年</li>
                    <li>総重量</li>
                    <li>緯度</li>
                    <li>経度</li>
                  </ol>
                </div>
                の四つである.それぞれどのように反映させているかというと,年のデータでまとまった年代ごとの色分けを行う.緯度,経度の数値を日本地図上に反映し,隕石が落ちた場所を円の中心とするようにする.日本地図がすでに実際の緯度経度が反映されて描かれているので位置は正確に描画される.そして円の大きさを総重量の値によって決める.
              </div>
            </section>
          </article>

          <article class="message is-dark">
            <section className="section">
              <div class="message-header">
                <p>可視化により</p>
              </div>
              <div class="message-body">
                この可視化は日本のどこに,いつ,どれくらいの規模の隕石が落ちたかを明確に視認することができる.上記の三条件を見やすく表現するには,今回のような日本地図上での円の描画が一番最適だと判断した。事実上記の三条件がこの図ならば明確に把握できる.この図を見ることによって,例えるならば本州には満遍なく隕石が落ちているのに対し,北海道はその面積に対し1つしか落ちていないことや,2000年に入ってからまだ3つしか隕石が落ちていないなどの情報が一目で読み取ることができる.
              </div>
            </section>
          </article>
        </div>
      </div>
    </body>
  );
};

export default Tops;
