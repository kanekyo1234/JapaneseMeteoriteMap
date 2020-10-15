import React, { useEffect, useState } from "react";
const Tops = () => {
  return (
    <div>
      <div className="container">
        <br></br>
        <section className="section">
          <article class="message is-dark">
            <div class="message-header">
              <p>このサイトについて</p>
            </div>
            <div class="message-body">
              このサイトは、日本に落ちた隕石のオープンデータを用い、日本地図上に実際に落ちた場所を描画し、それぞれの要素でしぼりこ絞り込みができる隕石の可視化サイトである。上記のMAPタブにデータが示されている。
              <br></br>使用したデータは
              <a href="http://linkdata.org/work/rdf1s2434i">こちら</a>
            </div>
          </article>
        </section>
        <section className="section">
          <article class="message is-dark">
            <div class="message-header">
              <p>MAPページについて</p>
            </div>
            <div class="message-body">
              過去861年から現在に至るまでの日本に落ちた隕石を描画している.その中で
              <strong>落下日,総重量 (kg),石自体の種類</strong>
              この3つの要素について絞り込みをすることができる。それを選択することにより様々な情報を手に入れることができる。
            </div>
          </article>
        </section>

        {/* <article class="message is-dark">
            <section className="section">
              <div class="message-header">
                <p>可視化により</p>
              </div>
              <div class="message-body">
                この可視化は日本のどこに,いつ,どれくらいの規模の隕石が落ちたかを明確に視認することができる.上記の三条件を見やすく表現するには,今回のような日本地図上での円の描画が一番最適だと判断した。事実上記の三条件がこの図ならば明確に把握できる.この図を見ることによって,例えるならば本州には満遍なく隕石が落ちているのに対し,北海道はその面積に対し1つしか落ちていないことや,2000年に入ってからまだ3つしか隕石が落ちていないなどの情報が一目で読み取ることができる.
              </div>
            </section>
          </article> */}
      </div>
    </div>
  );
};

export default Tops;
