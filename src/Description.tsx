
function Description({ username }) {

    return (
      <section onClick={()=> alert('クリックしました')} className="bg-[url(/public/find-icon.png)] bg-contain bg-left bg-no-repeat pl-20 border border-solid border-black rounded">
        <p>{username}さん、こんにちは！</p>
        <p><strong>時間割を計画するアプリ</strong>です。<a>詳しく</a></p>
        <p>中央大学生向けです。</p>
      </section>
    );
}

export default Description;