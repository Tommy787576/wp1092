import React from 'react';
import Layout from '../Layout';
import Instruction1_1 from '../pictures/instruction/1-1.PNG';
import Instruction1_2 from '../pictures/instruction/1-2.PNG';
import Instruction1_3 from '../pictures/instruction/1-3.PNG';
import Instruction1_4 from '../pictures/instruction/1-4.PNG';
import Instruction1_5 from '../pictures/instruction/1-5.PNG';
import Instruction1_6 from '../pictures/instruction/1-6.PNG';
import Instruction2_1 from '../pictures/instruction/2-1.PNG';
import Instruction2_2 from '../pictures/instruction/2-2.PNG';
import Instruction2_3 from '../pictures/instruction/2-3.PNG';
import Instruction2_4 from '../pictures/instruction/2-4.PNG';
import Instruction2_5 from '../pictures/instruction/2-5.PNG';
import Instruction3_1 from '../pictures/instruction/3-1.PNG';
import Instruction3_2 from '../pictures/instruction/3-2.PNG';
import Instruction3_3 from '../pictures/instruction/3-3.PNG';
import Instruction4_1 from '../pictures/instruction/4-1.PNG';
import Instruction4_2 from '../pictures/instruction/4-2.PNG';
import Instruction4_3 from '../pictures/instruction/4-3.PNG';
import Instruction4_4 from '../pictures/instruction/4-4.PNG';

const Instruction = () => {
    return (
        <Layout>
            <section className="container mt-5">
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab"
                            aria-controls="pills-home" aria-selected="true">首頁</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="pills-dest-tab" data-toggle="pill" href="#pills-dest" role="tab"
                            aria-controls="pills-dest" aria-selected="false">車站搜尋</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab"
                            aria-controls="pills-profile" aria-selected="false">常用車站</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab"
                            aria-controls="pills-contact" aria-selected="false">新增常用車站</a>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div className="mt-4">
                            <p><strong>說明1-1：</strong> 您可於「首頁」查詢您附近的車站，可選擇查詢「YouBike1.0」或是「YouBike2.0」車站，預設為「YouBike1.0」，可於左上角紅色框內點選對應的文字切換。</p>
                            <img className="w-100" src={Instruction1_1} alt="說明1-1" />
                        </div>
                        <div className="mt-4">
                            <p><strong>說明1-2：</strong> 在「YouBike1.0」模式中可選擇查詢您方圓250公尺、500公尺、750公尺或1000公尺內的車站，點選紅色框內對應的按鈕即可進行查詢。</p>
                            <img className="w-100" src={Instruction1_2} alt="說明1-2" />
                        </div>
                        <div className="mt-4">
                            <p><strong>說明1-3：</strong> 在「YouBike2.0」模式中可選擇查詢您方圓150公尺、250公尺、400公尺、600公尺或1000公尺內的車站，點選紅色框內對應的按鈕即可進行查詢。</p>
                            <img className="w-100" src={Instruction1_3} alt="說明1-3" />
                        </div>
                        <div className="mt-4">
                            <p><strong>說明1-4：</strong> 查詢結果如下，黑色人圖示表示您的所在位置，腳踏車圖示表示車站，其中黑色表示車站狀態正常，
                                <span style={{ color: "blue" }}>藍色</span>表示可借車數或可還空位數小於或等於5，<span style={{ color: "red" }}>紅色</span>表示可借車數或可還空位數為 0。</p>
                            <img className="w-100" src={Instruction1_4} alt="說明1-4" />
                        </div>
                        <div className="mt-4">
                            <p><strong>說明1-5：</strong> 點選地圖上的圖示可以看到該車站的可借車數與可還空位數，此外點選<span
                                style={{ color: "rgb(0, 162, 255)" }}>詳細地圖資訊</span>可以連結到Google地圖做更進一步的查詢。</p>
                            <img className="w-100" src={Instruction1_5} alt="說明1-5" />
                        </div>
                        <div className="mt-4">
                            <p><strong>說明1-6：</strong> 下圖為點選<span style={{ color: "rgb(0, 162, 255)" }}>詳細地圖資訊</span>後看到的Google地圖頁面。</p>
                            <img className="w-100" src={Instruction1_6} alt="說明1-6" />
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-dest" role="tabpanel" aria-labelledby="pills-dest-tab">
                        <div className="mt-4">
                            <p><strong>說明2-1：</strong> 您可於「車站搜尋」搜尋車站與該車站附近的車站，可選擇查詢「YouBike1.0」或是「YouBike2.0」車站，預設為「YouBike1.0」，可於左上角紅色框內點選對應的文字切換。</p>
                            <img className="w-100" src={Instruction2_1} alt="說明2-1" />
                        </div>
                        <div className="mt-4">
                            <p><strong>說明2-2：</strong> 請先輸入車站名稱。</p>
                            <img className="w-100" src={Instruction2_2} alt="說明2-2" />
                        </div>
                        <div className="mt-4">
                            <p><strong>說明2-3：</strong> 請選擇查詢該車站方圓幾公尺內的車站。</p>
                            <img className="w-100" src={Instruction2_3} alt="說明2-3" />
                        </div>
                        <div className="mt-4">
                            <p><strong>說明2-4：</strong> 最後請按下「按此搜尋」。</p>
                            <img className="w-100" src={Instruction2_4} alt="說明2-4" />
                        </div>
                        <div className="mt-4">
                            <p><strong>說明2-5：</strong> 查詢結果如下圖所示。</p>
                            <img className="w-100" src={Instruction2_5} alt="說明2-5" />
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                        <div className="mt-4">
                            <p><strong>說明3-1：</strong> 您可於「常用車站」頁面檢視您的常用車站，可選擇檢視「台北1.0」、「新北1.0」或是「台北2.0」車站，預設為「台北1.0」，可於左上角紅色框內點選對應的文字切換。</p>
                            <img className="w-100" src={Instruction3_1} alt="說明3-1" />
                        </div>
                        <div className="mt-4">
                            <p><strong>說明3-2：</strong> 若沒有常用車站會顯示如下的畫面，欲新增請到「新增常用車站」新增。</p>
                            <img className="w-100" src={Instruction3_2} alt="說明3-2" />
                        </div>
                        <div className="mt-4">
                            <p><strong>說明3-3：</strong> 欲刪除常用車站，請點選資訊卡下方的刪除按鈕，便可以看到彈出視窗顯示「確定要刪除 該車站」，點選OK便可刪除。</p>
                            <img className="w-100" src={Instruction3_3} alt="說明3-3" />
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                        <div className="mt-4">
                            <p><strong>說明4-1：</strong> 您可於「新增常用車站」頁面新增您的常用車站，可選擇新增「台北1.0」、「新北1.0」或是「台北2.0」車站，預設為「台北1.0」，可於左上角紅色框內點選對應的文字切換。</p>
                            <img className="w-100" src={Instruction4_1} alt="說明4-1" />
                        </div>
                        <div className="mt-4">
                            <p><strong>說明4-2：</strong> 欲新增車站，首先點選車站所在行政區，接著點選該車站對應的按鈕，便可以看到彈出視窗顯示「該車站 加入成功」。</p>
                            <img className="w-100" src={Instruction4_2} alt="說明4-2" />
                        </div>
                        <div className="mt-4">
                            <p><strong>說明4-3：</strong> 若該行政區車站數量過多，您可以在搜尋框內輸入車站名稱關鍵字，可以幫助您更快找到該車站。</p>
                            <img className="w-100" src={Instruction4_3} alt="說明4-3" />
                        </div>
                        <div className="mt-4">
                            <p><strong>說明4-4：</strong> 若該車站已經是常用車站，則會看到彈出視窗顯示「該車站 已經是常用車站」。</p>
                            <img className="w-100" src={Instruction4_4} alt="說明4-4" />
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Instruction;