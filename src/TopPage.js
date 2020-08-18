import React, { useEffect, useState } from "react";
const Tops = () => {
  return (
    <body>
      <div>
        <article class="message is-dark">
          <div className="container">
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
          </div>
        </article>

        <article class="message is-link">
          <div class="message-header">
            <p>可視化の目的</p>
          </div>
          <div class="message-body">この可視化は日本のどこに隕石が落ち</div>
        </article>
      </div>
    </body>
  );
};

export default Tops;
