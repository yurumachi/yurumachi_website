import React, { useState, useEffect, useRef } from 'react';
import { Mail, ArrowUp, Menu, X } from 'lucide-react';

// --- カラー定義 ---
const COLORS = {
    red: '#EF2535',
    green: '#B9D05A',
    blue: '#00989E',
    yellow: '#FFBD59',
    text: '#535353',
    border: '#000000' // 枠線をくっきり黒に
};

// --- コンポーネント: プレースホルダー画像 ---
const PlaceholderImg = ({ className, text, bgColor = "bg-gray-100", textColor = "text-gray-400" }) => (
    <div className={`flex items-center justify-center font-bold text-xl ${bgColor} ${textColor} ${className}`}>
        {text || 'Image'}
    </div>
);

// --- コンポーネント: セクションタイトル ---
const SectionTitle = ({ title, colorClass, borderColorClass = "border-[#4C8F3D]" }) => (
    <div className="flex items-center mb-12">
        <div className={`w-[13px] h-[50px] md:h-[70px] ${borderColorClass} border-l-[13px] mr-6 md:mr-8`}></div>
        <h2 className={`text-3xl md:text-5xl font-bold ${colorClass}`}>{title}</h2>
    </div>
);

// --- コンポーネント: スクロールフェードインアニメーション ---
const FadeIn = ({ children, delay = 0, direction = 'up', className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    const getTransform = () => {
        if (isVisible) return 'translate(0, 0)';
        if (direction === 'up') return 'translateY(20px)';
        if (direction === 'left') return 'translateX(20px)';
        if (direction === 'right') return 'translateX(-20px)';
        return 'translate(0, 0)';
    };

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${className}`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: getTransform(),
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
};

// --- コンポーネント: 背景の動くBlob（小さく・くっきり・彩度高く） ---
const BackgroundBlobs = () => {
    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden -z-20 pointer-events-none bg-white">
            {/* 背景は真っ白。その上に小さなBlobを配置。
        blurを外して輪郭をくっきりさせ、opacityを1にして色を鮮やかにします。
      */}

            {/* Blob 1: 左上 - Red */}
            <div
                className="absolute top-[5%] left-[5%] w-[120px] h-[120px] bg-[#EF2535] opacity-90 animate-float-morph"
                style={{ animationDelay: '0s', animationDuration: '20s' }}
            ></div>

            {/* Blob 2: 右下 - Green */}
            <div
                className="absolute bottom-[10%] right-[5%] w-[150px] h-[150px] bg-[#B9D05A] opacity-90 animate-float-morph"
                style={{ animationDelay: '-5s', animationDuration: '23s' }}
            ></div>

            {/* Blob 3: 左中央 - Yellow */}
            <div
                className="absolute top-[45%] left-[2%] w-[100px] h-[100px] bg-[#FFBD59] opacity-90 animate-float-morph"
                style={{ animationDelay: '-10s', animationDuration: '25s' }}
            ></div>

            {/* Blob 4: 右上 - Blue */}
            <div
                className="absolute top-[15%] right-[8%] w-[130px] h-[130px] bg-[#00989E] opacity-90 animate-float-morph"
                style={{ animationDelay: '-15s', animationDuration: '22s' }}
            ></div>

            {/* Blob 5: 中央下 - Red */}
            <div
                className="absolute bottom-[5%] left-[30%] w-[90px] h-[90px] bg-[#EF2535] opacity-90 animate-float-morph"
                style={{ animationDelay: '-8s', animationDuration: '28s' }}
            ></div>

            {/* Blob 6: 中央上 - Green (追加) */}
            <div
                className="absolute top-[10%] left-[40%] w-[80px] h-[80px] bg-[#B9D05A] opacity-90 animate-float-morph"
                style={{ animationDelay: '-3s', animationDuration: '18s' }}
            ></div>

            {/* Blob 7: 右中央 - Yellow (追加) */}
            <div
                className="absolute top-[60%] right-[15%] w-[110px] h-[110px] bg-[#FFBD59] opacity-90 animate-float-morph"
                style={{ animationDelay: '-12s', animationDuration: '26s' }}
            ></div>

            {/* Blob 8: 左下 - Blue (追加) */}
            <div
                className="absolute bottom-[20%] left-[10%] w-[140px] h-[140px] bg-[#00989E] opacity-90 animate-float-morph"
                style={{ animationDelay: '-7s', animationDuration: '24s' }}
            ></div>
        </div>
    );
};

// --- メインアプリケーション ---
export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // スムーズスクロールの実装
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="w-full min-h-screen bg-transparent font-sans text-[#535353] overflow-x-hidden relative">
            {/* CSSスタイル定義 */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700&display=swap');
        
        .font-jp { font-family: 'Noto Sans JP', sans-serif; }
        .font-lato { font-family: 'Lato', sans-serif; }
        
        /* コンテンツ内の装飾用Blob */
        .blob-shape { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }

        /* 背景アニメーション用Keyframes */
        @keyframes float-morph {
          0% {
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%;
            transform: translate(20px, -30px) rotate(20deg);
          }
          66% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            transform: translate(-20px, 20px) rotate(-10deg);
          }
          100% {
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
            transform: translate(0, 0) rotate(0deg);
          }
        }

        .animate-float-morph {
          animation: float-morph 15s ease-in-out infinite;
        }
        
        /* モバイルメニューのアニメーション */
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }

        /* コンテンツパネルスタイル（不透明な白・枠線あり） */
        .solid-panel {
          background-color: #FFFFFF;
          border: 1px solid #000000;
          box-shadow: 4px 4px 0px rgba(0,0,0,0.1); /* 少しポップな影 */
        }
        
        /* カードスタイル */
        .card-panel {
          background-color: #FFFFFF;
          border: 1px solid #E5E7EB;
          transition: all 0.3s ease;
        }
        .card-panel:hover {
          border-color: #000000;
          transform: translateY(-4px);
          box-shadow: 4px 4px 0px rgba(0,0,0,0.1);
        }
      `}</style>

            {/* 背景の動くBlob（固定配置・白背景） */}
            <BackgroundBlobs />

            {/* ================= ヘッダー ================= */}
            <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-[1280px] mx-auto h-[80px] md:h-[114px] flex justify-between items-center px-4 md:px-8">
                    {/* ロゴエリア */}
                    <div className="flex items-center gap-4 cursor-pointer" onClick={scrollToTop}>
                        <div className="w-[60px] h-[60px] md:w-[81px] md:h-[81px] bg-gray-100 rounded-full overflow-hidden shrink-0 border border-gray-300">
                            <img src="/api/placeholder/81/81" alt="Logo Icon" className="w-full h-full object-cover" />
                        </div>
                        <div className="hidden md:block w-[150px] h-[50px] flex items-center justify-center text-sm font-bold text-gray-500">
                            Logo Text
                        </div>
                    </div>

                    {/* デスクトップナビゲーション */}
                    <nav className="hidden md:flex items-center gap-12 font-jp font-bold text-lg">
                        <button onClick={() => scrollToSection('business')} className="hover:text-[#EF2535] transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#EF2535] hover:after:w-full after:transition-all text-[#535353]">事業紹介</button>
                        <button onClick={() => scrollToSection('news')} className="hover:text-[#00989E] transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#00989E] hover:after:w-full after:transition-all text-[#535353]">新着情報</button>
                        <button onClick={() => scrollToSection('members')} className="hover:text-[#B9D05A] transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#B9D05A] hover:after:w-full after:transition-all text-[#535353]">メンバー</button>
                        <button onClick={() => scrollToSection('contact')} className="hover:text-[#FFBD59] transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#FFBD59] hover:after:w-full after:transition-all text-[#535353]">お問い合わせ</button>
                    </nav>

                    {/* モバイルメニューボタン */}
                    <button className="md:hidden p-2 bg-gray-100 rounded-md border border-gray-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* モバイルメニュー */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-[80px] left-0 w-full bg-white border-b border-gray-200 py-4 px-4 flex flex-col gap-4 font-jp font-bold text-lg animate-slide-down shadow-lg">
                        <button onClick={() => scrollToSection('business')} className="py-2 hover:text-[#EF2535] text-left border-b border-gray-100">事業紹介</button>
                        <button onClick={() => scrollToSection('news')} className="py-2 hover:text-[#00989E] text-left border-b border-gray-100">新着情報</button>
                        <button onClick={() => scrollToSection('members')} className="py-2 hover:text-[#B9D05A] text-left border-b border-gray-100">メンバー</button>
                        <button onClick={() => scrollToSection('contact')} className="py-2 hover:text-[#FFBD59] text-left">お問い合わせ</button>
                    </div>
                )}
            </header>

            {/* ヘッダー分の余白 */}
            <div className="h-[80px] md:h-[114px]"></div>

            {/* ================= ヒーローイメージ ================= */}
            <section className="w-full max-w-[1920px] mx-auto h-[400px] md:h-[800px] bg-white relative overflow-hidden group border-b border-gray-200">
                <FadeIn delay={200} className="w-full h-full">
                    <img
                        src="/api/placeholder/1280/800"
                        alt="Hero"
                        className="w-full h-full object-cover transition-transform duration-[20s] ease-linear transform group-hover:scale-105"
                    />
                </FadeIn>
                <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                    <FadeIn delay={500} direction="up">
                        <div className="bg-white px-10 py-8 solid-panel">
                            <h1 className="text-4xl md:text-6xl font-bold text-[#535353] font-jp tracking-wider">
                                Yurumachi Committee
                            </h1>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ================= 事業紹介 ================= */}
            <section id="business" className="w-full max-w-[1280px] mx-auto py-16 md:py-24 px-4 md:px-9 overflow-hidden">
                <FadeIn>
                    <div className="bg-white px-6 py-2 border border-gray-200 inline-block mb-12 shadow-sm">
                        <SectionTitle title="事業紹介" colorClass="text-[#EF2535]" />
                    </div>
                </FadeIn>

                <div className="flex flex-col gap-24 md:gap-48 relative">

                    {/* --- Item 1: 学生イベントの運営 --- */}
                    <div className="relative w-full min-h-[400px] flex flex-col md:block">
                        {/* コンテンツ背面の装飾Blob (大きく淡く配置して奥行きを出す) */}
                        <div className="absolute top-0 left-[-50px] md:left-0 w-[300px] md:w-[500px] h-[300px] md:h-[400px] bg-[#FFBD59] opacity-30 blob-shape -z-10 rotate-3 animate-float-morph"></div>

                        {/* テキストコンテンツ */}
                        <div className="md:absolute md:top-[80px] md:left-[116px] z-10 p-4">
                            <FadeIn delay={200} direction="right">
                                <div className="solid-panel p-10 max-w-[800px]">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-6 font-jp text-[#535353] border-b-2 border-[#FFBD59] inline-block pb-2">学生イベントの運営</h3>
                                    <p className="text-lg md:text-2xl font-bold leading-relaxed font-jp text-[#535353]">
                                        ここに、概要・目的・いろいろ書く。<br />
                                        まちぶんを実施したこととか。<br />
                                        地域の学生と連携して新しい価値を創造します。<br />
                                        イベントを通じて交流を深めます。
                                    </p>
                                </div>
                            </FadeIn>
                        </div>

                        {/* 写真 */}
                        <div className="md:absolute md:top-[120px] md:right-[100px] mt-8 md:mt-0 self-end md:self-auto z-10">
                            <FadeIn delay={400} direction="up">
                                <div className="w-[280px] md:w-[320px] h-[200px] md:h-[240px] bg-white border-2 border-black p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                                    <div className="w-full h-full bg-gray-200 overflow-hidden">
                                        <img src="/api/placeholder/320/240" alt="Event" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div className="mt-4 text-right">
                                    <span className="font-bold text-xl text-black bg-white border border-black px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block">Event Photo</span>
                                </div>
                            </FadeIn>
                        </div>
                    </div>

                    {/* --- Item 2: 学生の支援 --- */}
                    <div className="relative w-full min-h-[400px] flex flex-col md:block">
                        {/* コンテンツ背面の装飾Blob */}
                        <div className="absolute top-[50px] right-[-20px] md:left-[600px] w-[300px] md:w-[500px] h-[250px] md:h-[400px] bg-[#B9D05A] opacity-30 blob-shape -z-10 -rotate-3 animate-float-morph"></div>

                        {/* 写真 (左側) */}
                        <div className="md:absolute md:top-[50px] md:left-[115px] order-2 md:order-1 mt-8 md:mt-0 self-start md:self-auto z-10">
                            <FadeIn delay={200} direction="up">
                                <div className="w-[280px] md:w-[320px] h-[200px] md:h-[240px] bg-white border-2 border-black p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                                    <div className="w-full h-full bg-gray-200 overflow-hidden">
                                        <img src="/api/placeholder/320/240" alt="Support" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div className="mt-4 text-left md:text-right">
                                    <span className="font-bold text-xl text-black bg-white border border-black px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block">Support Photo</span>
                                </div>
                            </FadeIn>
                        </div>

                        {/* テキストコンテンツ (右側) */}
                        <div className="md:absolute md:top-[50px] md:right-[50px] md:text-right order-1 md:order-2 z-10 p-4 flex justify-end">
                            <FadeIn delay={400} direction="left">
                                <div className="solid-panel p-10 max-w-[800px] text-right">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-6 font-jp text-[#535353] border-b-2 border-[#B9D05A] inline-block pb-2">学生の支援</h3>
                                    <div className="flex justify-end">
                                        <p className="text-lg md:text-2xl font-bold leading-relaxed font-jp text-[#535353]">
                                            ここに、概要・目的・いろいろ書く。<br />
                                            学生の活動を資金面・技術面でサポート。<br />
                                            未来を担う若者の挑戦を応援します。<br />
                                            いいいいいいいいいいいいいいいい
                                        </p>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>

                </div>
            </section>

            {/* ================= 写真ギャラリー (Grid) ================= */}
            <section className="w-full max-w-[1920px] mx-auto p-4 bg-white/50 border-y border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[1280px] mx-auto py-8">
                    {[1, 2, 3, 4].map((item, index) => (
                        <div key={item} className="aspect-[4/3] bg-white border border-gray-300 p-2 shadow-sm hover:shadow-md transition-all">
                            <div className="w-full h-full overflow-hidden relative border border-gray-100">
                                <img src="/api/placeholder/400/300" alt={`Gallery ${item}`} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= 新着情報 ================= */}
            <section id="news" className="w-full max-w-[1280px] mx-auto py-16 md:py-24 px-4 md:px-9 relative z-10">
                <FadeIn>
                    <div className="bg-white px-6 py-2 border border-gray-200 inline-block mb-12 shadow-sm">
                        <SectionTitle title="新着情報" colorClass="text-[#00989E]" />
                    </div>
                </FadeIn>

                <div className="flex flex-col px-0 md:px-8 max-w-[1144px] mx-auto solid-panel p-8 md:p-12 rounded-lg">
                    {[1, 2, 3, 4, 5].map((item, index) => (
                        <FadeIn key={item} delay={index * 100} direction="up">
                            <div className="group cursor-pointer">
                                <div className="flex flex-col py-6 transition-all duration-300 group-hover:bg-gray-50 group-hover:pl-4 rounded-lg">
                                    <span className="font-lato font-medium text-lg text-[#535353] mb-2">2025.07.08</span>
                                    <span className="font-bold text-lg md:text-xl text-[#535353] group-hover:text-[#00989E] transition-colors">
                                        合同会社Migleeが設立されました！ 新しいプロジェクトが始動します。
                                    </span>
                                </div>
                                <div className="w-full h-[1px] bg-gray-300 group-hover:bg-[#00989E] transition-colors"></div>
                            </div>
                        </FadeIn>
                    ))}

                    <FadeIn delay={600} className="mt-8 text-right">
                        <button className="text-[#00989E] font-bold border-2 border-[#00989E] bg-white px-6 py-3 rounded-full hover:bg-[#00989E] hover:text-white transition-colors shadow-sm">
                            一覧を見る
                        </button>
                    </FadeIn>
                </div>
            </section>

            {/* ================= メンバー ================= */}
            <section id="members" className="w-full max-w-[1280px] mx-auto py-16 md:py-24 px-4 md:px-9 my-12">
                <FadeIn>
                    <div className="bg-white px-6 py-2 border border-gray-200 inline-block mb-12 shadow-sm">
                        <SectionTitle title="メンバー" colorClass="text-[#B9D05A]" />
                    </div>
                </FadeIn>

                {/* メンバーグリッドエリア */}
                <div className="solid-panel p-8 md:p-12 rounded-lg bg-white/95">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
                        {/* メンバーカード */}
                        {[
                            { name: "山田 太郎", en: "Yamada Taro", role: "代表理事" },
                            { name: "田中 花子", en: "Tanaka Hanako", role: "副代表" },
                            { name: "佐藤 二郎", en: "Sato Jiro", role: "理事" },
                            { name: "鈴木 三郎", en: "Suzuki Saburo", role: "広報" },
                            { name: "高橋 健一", en: "Takahashi Kenichi", role: "企画" },
                            { name: "伊藤 由美", en: "Ito Yumi", role: "会計" },
                            { name: "渡辺 翔太", en: "Watanabe Shota", role: "エンジニア" },
                            { name: "中村 美咲", en: "Nakamura Misaki", role: "デザイナー" },
                        ].map((member, index) => (
                            <FadeIn key={index} delay={index * 100} direction="up">
                                <div className="flex flex-col items-center group">
                                    <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full bg-white mb-6 overflow-hidden border-2 border-gray-200 shadow-md group-hover:border-[#B9D05A] transition-all duration-300 group-hover:shadow-lg">
                                        <img src={`/api/placeholder/160/160?text=${index + 1}`} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-lg md:text-xl font-bold font-jp text-[#535353] border-b border-gray-300 inline-block mb-2 pb-1">{member.name}</h3>
                                        <p className="font-lato font-bold text-sm md:text-base text-gray-500 mb-2">{member.en}</p>
                                        <div className="inline-block px-3 py-1 bg-white border border-gray-300 shadow-sm rounded-full">
                                            <p className="font-medium text-sm md:text-base text-[#535353]">#{member.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= お問い合わせ ================= */}
            <section id="contact" className="w-full max-w-[1280px] mx-auto py-16 md:py-24 px-4 md:px-9 mb-12">
                <FadeIn>
                    <div className="bg-white px-6 py-2 border border-gray-200 inline-block mb-12 shadow-sm">
                        <SectionTitle title="お問い合わせ" colorClass="text-[#FFBD59]" />
                    </div>
                </FadeIn>

                <FadeIn delay={200} direction="up">
                    <div className="w-full max-w-[640px] mx-auto solid-panel p-6 md:p-12 rounded-lg">
                        <form className="flex flex-col gap-6">

                            <div className="w-full">
                                <div className="flex items-center gap-2 mb-2">
                                    <label className="text-lg font-jp font-medium text-[#535353]">お名前</label>
                                    <span className="text-red-500 text-xs font-bold px-2 py-0.5 bg-white border border-red-500 rounded-sm">必須</span>
                                </div>
                                <input type="text" placeholder="例：山田 太郎" className="w-full p-4 border-2 border-gray-300 rounded-lg bg-white focus:border-[#FFBD59] focus:outline-none transition-all" />
                            </div>

                            <div className="w-full">
                                <div className="flex items-center gap-2 mb-2">
                                    <label className="text-lg font-jp font-medium text-[#535353]">メールアドレス</label>
                                    <span className="text-red-500 text-xs font-bold px-2 py-0.5 bg-white border border-red-500 rounded-sm">必須</span>
                                </div>
                                <input type="email" placeholder="example@email.com" className="w-full p-4 border-2 border-gray-300 rounded-lg bg-white focus:border-[#FFBD59] focus:outline-none transition-all" />
                            </div>

                            <div className="w-full">
                                <div className="flex items-center gap-2 mb-2">
                                    <label className="text-lg font-jp font-medium text-[#535353]">件名</label>
                                    <span className="text-red-500 text-xs font-bold px-2 py-0.5 bg-white border border-red-500 rounded-sm">必須</span>
                                </div>
                                <input type="text" className="w-full p-4 border-2 border-gray-300 rounded-lg bg-white focus:border-[#FFBD59] focus:outline-none transition-all" />
                            </div>

                            <div className="w-full">
                                <div className="flex items-center gap-2 mb-2">
                                    <label className="text-lg font-jp font-medium text-[#535353]">内容</label>
                                    <span className="text-red-500 text-xs font-bold px-2 py-0.5 bg-white border border-red-500 rounded-sm">必須</span>
                                </div>
                                <textarea placeholder="お問い合わせ内容をご記入ください" className="w-full h-[200px] p-4 border-2 border-gray-300 rounded-lg bg-white resize-none focus:border-[#FFBD59] focus:outline-none transition-all"></textarea>
                            </div>

                            <button type="button" className="w-full md:w-auto md:px-12 py-4 bg-[#FFBD59] text-white font-bold text-xl rounded-lg border-2 border-transparent shadow-md hover:bg-white hover:text-[#FFBD59] hover:border-[#FFBD59] transition-all transform hover:-translate-y-1 mx-auto mt-6">
                                送信する
                            </button>

                        </form>
                    </div>
                </FadeIn>
            </section>

            {/* ================= フッター ================= */}
            <footer className="w-full bg-white relative pt-10 pb-8 px-4 md:px-16 border-t border-gray-300 mt-20">
                <div className="max-w-[1280px] mx-auto relative">

                    {/* Topへ戻るボタン */}
                    <div className="absolute top-[-70px] right-0 md:right-4">
                        <button
                            onClick={scrollToTop}
                            className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-[#4C8F3D] rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:translate-y-1 hover:shadow-none transition-all text-white border-2 border-white"
                        >
                            <ArrowUp size={24} strokeWidth={3} />
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-8 gap-8 md:gap-0">

                        {/* 左側：企業情報 */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 w-full md:w-auto">
                            <div className="w-[100px] h-[100px] md:w-[117px] md:h-[140px] bg-white rounded-none shrink-0 border border-gray-300 p-2">
                                <img src="/api/placeholder/117/140" alt="Footer Logo" className="w-full h-full object-cover" />
                            </div>

                            {/* 縦線（デスクトップのみ） */}
                            <div className="hidden md:block h-[120px] w-[2px] bg-gray-300"></div>

                            <div className="flex flex-col justify-center gap-2">
                                <h3 className="font-bold text-lg md:text-xl text-[#535353] font-jp">一般社団法人　ゆるまち委員会</h3>
                                <p className="font-medium text-sm md:text-base text-[#535353] font-jp mt-2">〒150-0021 新潟県長岡市〇〇〇〇〇〇〇〇</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <div className="w-6 h-6 bg-[#535353] rounded-sm flex items-center justify-center text-white">
                                        <Mail size={14} />
                                    </div>
                                    <span className="font-lato font-medium text-sm md:text-base tracking-wide text-[#535353]">yurumachi.yuruyuru@gmail.com</span>
                                </div>
                            </div>
                        </div>

                        {/* 右側：フッターナビ */}
                        <nav className="flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-8 w-full md:w-auto justify-center md:justify-end">
                            <button onClick={() => scrollToSection('business')} className="font-bold text-base md:text-lg text-[#535353] hover:text-[#EF2535] transition-colors">事業紹介</button>
                            <button onClick={() => scrollToSection('news')} className="font-bold text-base md:text-lg text-[#535353] hover:text-[#00989E] transition-colors">新着情報</button>
                            <button onClick={() => scrollToSection('members')} className="font-bold text-base md:text-lg text-[#535353] hover:text-[#B9D05A] transition-colors">メンバー</button>
                            <button onClick={() => scrollToSection('contact')} className="font-bold text-base md:text-lg text-[#535353] hover:text-[#FFBD59] transition-colors">お問い合わせ</button>
                        </nav>

                    </div>

                    <div className="mt-12 text-center text-xs text-gray-400 font-lato">
                        &copy; 2025 Yurumachi Committee. All Rights Reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}