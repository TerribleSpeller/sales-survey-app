import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import React, { useState, useEffect } from 'react';
import { database } from '../lib/firebaseConfig';
import { getDatabase, ref, get, onValue, child, set, push, query, update, remove } from 'firebase/database';
import router from 'next/router';

const db = database;

export default function Home() {
  const [agent, setAgent] = useState('');
  const [unit, setUnit] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [salesCoordinator, setSalesCoordinator] = useState('');
  const [salesOffice, setSalesOffice] = useState('');
  const [salesExecutive, setSalesExecutive] = useState('');
  const [filledUnits, setFilledUnits] = useState([]);

  useEffect(() => {
    const dbRef = ref(db, "agentSurvey/readOfFilled/");
    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const data = snapshot.val();
          const filledUnitsArray = Object.values(data);
          setFilledUnits(filledUnitsArray);
          console.log(filledUnitsArray);
        } else {
        }
      }
    );

    // Cleanup function to remove the listener
    return () => unsubscribe();
  }, []);

  const letGO = async () => {
    if (agent === '' || unit === '') {
      alert('Please fill in all fields');
      return;
    }

    const data = {
      unit: unit,
      salesCoordinator: salesExecutive,
      salesOffice: salesOffice,
      agent: agent,
    };

    function generateID() {
      const date = new Date();
      const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
      const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit random number
      return `${formattedDate}${randomNumber}`;
    }

    await set(ref(db, 'agentSurvey/' + generateID()), data)
      .then(async () => {
        await set(ref(db, 'agentSurvey/readOfFilled/' + generateID()), unit).catch((error) => {
          console.error("Error writing to database: ", error);
        });
        // alert('Data submitted successfully');
        setSuccess('Data submitted successfully');
        setAgent('');
        setUnit('');
        setSalesCoordinator('');
        setSalesOffice
        setTimeout(() => {
          setSuccess('');
        }, 3000);
        // router.push('https://hiera.co.id/');
      })
      .catch((error) => {
        // alert('Error submitting data: ' + error.message);
        setError('Error submitting data: ' + error.message);
      });;

  }


  return (
    <>
      <Head>
        <title>Sinar Mitbana Mas Survey App</title>
        <meta name="description" content="A survey app for Sinar Mitbana Mas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main>
          <div id="Header">
            <div className="navbar-wrapper">
              <div className="navbar-local navbar navbar-expand-lg light is-scrolled">
                <div className="container position-relative d-flex justify-content-between align-items-center">
                  <a className="navbar-brand" href="/">
                    <img
                      src="logo2.png"
                      className="img-fluid dark"
                      alt="Logo"
                      style={{ maxWidth: "20%" }}
                    />
                  </a>
                  <a className="navbar-brand d-flex justify-content-end" href="/">
                    <img
                      src="logo.png"
                      className="img-fluid dark"
                      alt="Logo"
                      style={{ maxWidth: "40%" }}
                    />
                  </a>
                </div>
              </div>
              <hr />
            </div>
          </div>
          <div id="main-content-survey">
            <div className="container mx-auto">
              <div className="row">
                <div className="col">
                  <h1 className="mt-5">Agent Survey</h1>
                  <p>
                  Terima kasih telah menjadi agen yang berharga bagi HIERA.                  </p>
                  <p>
                  Kami mengundang Anda untuk memilih Koordinator Penjualan yang paling mendukung Anda selama proses pembelian.                  </p>
                  <p>
                  Masukan Anda membantu kami menghargai layanan hebat dan terus meningkatkan pengalaman pelanggan.                  </p>
                </div>
              </div>
              <div className="container">
                <div className="col">
                  <div className="col-5">
                    {success && <div className="alert alert-success">{success}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form>
                      <label htmlFor="unit">Sales Office</label>
                      <select
                        type="text"
                        className="form-control"
                        id="unit"
                        value={salesOffice}
                        onChange={(e) => setSalesOffice(e.target.value)}
                      >
                        <option default value="">
                          Pilih Kantor Penjualan
                        </option>
                        <option value="PT. Asia Rumah Utama">PT. Asia Rumah Utama</option>
                        <option value="PT Momentum Properti Cemerlang">PT Momentum Properti Cemerlang</option>
                        <option value="PT Sukses Muda Sejati">PT. Sukses Muda Sejati</option>
                        <option value="PT Harmoni Inti Makmur">PT Harmoni Inti Makmur</option>
                        <option value="PT Properti Berkat Cahaya Anug">PT Properti Berkat Cahaya Anug</option>
                        <option value="PT Pintu Berkat Bersama">PT Pintu Berkat Bersama</option>
                        <option value="PT. Catur Graha Sejahtera">PT. Catur Graha Sejahtera</option>
                        <option value="PT Enam Gemilang Abadi">PT Enam Gemilang Abadi</option>
                        <option value="PT Kemah Properti Indonesia">PT Kemah Properti Indonesia</option>
                        <option value="PT Berkat Mulia Pratama">PT Berkat Mulia Pratama</option>
                        <option value="PT Generasi Properti Nusantara">PT Generasi Properti Nusantara</option>
                        <option value="PT Gading Serpong Properti">PT Gading Serpong Properti</option>

                        <option value="PT Pratama Rumah Indonesia">PT Pratama Rumah Indonesia</option>
                        <option value="PT. Elitpro Gading Perkasa">PT. Elitpro Gading Perkasa</option>
                        <option value="PT Kurnia Mitra Harmoni">PT Kurnia Mitra Harmoni</option>
                        <option value="PT Pintu Berkat Bersama">PT Pintu Berkat Bersama</option>
                        <option value="PT Analis Properti Indonesia">PT Analis Properti Indonesia</option>
                        <option value="PT Pintar Properti Nusantara">PT Pintar Properti Nusantara</option>
                        <option value="PT Kencana Abadi Propertindo">PT Kencana Abadi Propertindo</option>
                        <option value="PT. Tri Elemen Properti">PT. Tri Elemen Properti</option>
                        <option value="PT. Sentosa Majujaya Propertin">PT. Sentosa Majujaya Propertin</option>
                        <option value="PT. Catur Graha Sejahtera">PT. Catur Graha Sejahtera</option>
                      </select>
                      <br />

                      <label htmlFor="agent">Sales Executive</label>
                      <select
                        className="form-select"
                        id="agent"
                        value={salesExecutive}
                        onChange={(e) => setSalesExecutive(e.target.value)}
                      >
                        <option default value="">
                        Pilih Koordinator
                        </option>
                        {salesOffice == "PT. Asia Rumah Utama" && <option value="Andre Leonardo" >Andre Leonardo</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && <option value="Andrian Chandana Deva" >Andrian Chandana Deva</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && <option value="Kelvin Ang Luis" >Kelvin Ang Luis</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && <option value="William Chandra Tjiang" >William Chandra Tjiang</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && <option value="Reza Alhadithia" >Reza Alhadithia</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && <option value="Gerry Lineker Armando Megawe" >Gerry Lineker Armando Megawe</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && <option value="Shelvyana Wijayanti" >Shelvyana Wijayanti</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && <option value="Swandy Sutanto" >Swandy Sutanto</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && <option value="Deanry Irsan" >Deanry Irsan</option>}
                        {salesOffice == "PT Momentum Properti Cemerlang" && <option value="Yoga Tirtabudi" >Yoga Tirtabudi</option>}
                        {salesOffice == "PT Momentum Properti Cemerlang" && <option value="Kevin Ananta Riadi" >Kevin Ananta Riadi</option>}
                        {salesOffice == "PT Momentum Properti Cemerlang" && <option value="Herman Yosef" >Herman Yosef                          </option>}
                        {salesOffice == "PT Momentum Properti Cemerlang" && <option value="Yamin Tanutama" >Yamin Tanutama</option>}
                        {salesOffice == "PT Sukses Muda Sejati" && <option value="Nina Mardiana" >Nina Mardiana                          </option>}
                        {salesOffice == "PT Harmoni Inti Makmur" && <option value="Felix Kuosanto" >Felix Kuosanto</option>}
                        {salesOffice == "PT Properti Berkat Cahaya Anug" && <option value="Anthonye Caeisar Lahoya" >Anthonye Caeisar Lahoya</option>}
                        {salesOffice == "PT Pintu Berkat Bersama" && <option value="Michael" >Michael</option>}
                        {salesOffice == "PT. Catur Graha Sejahtera" && <option value="Zacharia Agusto Dumais" >Zacharia Agusto Dumais</option>}
                        {salesOffice == "PT Enam Gemilang Abadi" && <option value="Darmawan" >Darmawan</option>}
                        {salesOffice == "PT Kemah Properti Indonesia" && <option value="Sherly" >Sherly</option>}
                        {salesOffice == "PT Berkat Mulia Pratama" && <option value="Ardian Gunawan" >Ardian Gunawan</option>}
                        {salesOffice == "PT Generasi Properti Nusantara" && <option value="Madelyn Wongkar" >Madelyn Wongkar</option>}
                        {salesOffice == "PT Gading Serpong Properti" && <option value="Renny Rosely" >Renny Rosely</option>}
                        {salesOffice == "PT Pratama Rumah Indonesia" && <option value="YUKI" >YUKI</option>}
                        {salesOffice == "PT. Elitpro Gading Perkasa" && <option value="Swandy Sutanto" >Swandy Sutanto</option>}
                        {salesOffice == "PT Kurnia Mitra Harmoni" && <option value="Martinus Hendratha" >Martinus Hendratha</option>}
                        {salesOffice == "PT Pratama Rumah Indonesia" && <option value="Hendri" >Hendri</option>}
                        {salesOffice == "PT Analis Properti Indonesia" && <option value="Corry Stefanie" >Corry Stefanie</option>}
                        {salesOffice == "PT Kemah Properti Indonesia" && <option value="Sharmaine Huberta A Dermawan" >Sharmaine Huberta A Dermawan</option>}
                        {salesOffice == "PT Pintar Properti Nusantara" && <option value="Putra Andika" >Putra Andika</option>}
                        {salesOffice == "PT Kencana Abadi Propertindo" && <option value="William Handoko" >William Handoko</option>}
                        {salesOffice == "PT. Sentosa Majujaya Propertin" && <option value="Jeffrey Hartanto" >Jeffrey Hartanto</option>}
                        {salesOffice == "PT. Tri Elemen Properti" && <option value="Vivi Hermin" >Vivi Hermin</option>}
                        {salesOffice == "PT. Tri Elemen Properti" && <option value="Irene" >Irene</option>}
                        {salesOffice == "PT Pratama Rumah Indonesia" && <option value="Kevin Krieski" >Kevin Krieski</option>}
                      </select>
                      <br />

                      <label htmlFor="unit">Unit Penjual</label>
                      <select
                        type="text"
                        className="form-control"
                        id="unit"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                      >
                        <option default value="">
                        Pilih Kantor & Koordinator untuk Memilih Unit
                                                </option>
                        <option disabled value="">
                          Jika Unit tidak ditemukan - berarti unit sudah terisi
                        </option>
                        {/* Enjoy copy paste hell!*/}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Andre Leonardo" && !filledUnits.includes("B1/23") && <option value="B1/23" >B1/23</option>}
                        {salesOffice == "PT Momentum Properti Cemerlang" && salesExecutive == "Yoga Tirtabudi" && !filledUnits.includes("B1/29") && <option value="B1/29" >B1/29</option>}
                        {salesOffice == "PT Sukses Muda Sejati" && salesExecutive == "Nina Mardiana" && !filledUnits.includes("B3/30") && <option value="B3/30" >B3/30</option>}
                        {salesOffice == "PT Harmoni Inti Makmur" && salesExecutive == "Felix Kuosanto" && !filledUnits.includes("B3/23") && <option value="B3/23" >B3/23</option>}
                        {salesOffice == "PT Properti Berkat Cahaya Anug" && salesExecutive == "Anthonye Caeisar Lahoya" && !filledUnits.includes("B8/23") && <option value="B8/23" >B8/23</option>}
                        {salesOffice == "PT Pintu Berkat Bersama" && salesExecutive == "Michael" && !filledUnits.includes("B2/25") && <option value="B2/25" >B2/25</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Andrian Chandana Deva" && !filledUnits.includes("B1/25") && <option value="B1/25" >B1/25</option>}
                        {salesOffice == "PT. Catur Graha Sejahtera" && salesExecutive == "Zacharia Agusto Dumais" && !filledUnits.includes("B6/20") && <option value="B6/20" >B6/20</option>}
                        {salesOffice == "PT Enam Gemilang Abadi" && salesExecutive == "Darmawan" && !filledUnits.includes("B2/33") && <option value="B2/33" >B2/33</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Kelvin Ang Luis" && !filledUnits.includes("B6/23") && <option value="B6/23" >B6/23</option>}
                        {salesOffice == "PT Kemah Properti Indonesia" && salesExecutive == "Sherly" && !filledUnits.includes("B3/25") && <option value="B3/25" >B3/25</option>}
                        {salesOffice == "PT Berkat Mulia Pratama" && salesExecutive == "Ardian Gunawan" && !filledUnits.includes("B5/26") && <option value="B5/26" >B5/26</option>}
                        {salesOffice == "PT Momentum Properti Cemerlang" && salesExecutive == "Kevin Ananta Riadi" && !filledUnits.includes("B6/22") && <option value="B6/22" >B6/22</option>}
                        {salesOffice == "PT Generasi Properti Nusantara" && salesExecutive == "Madelyn Wongkar" && !filledUnits.includes("B3/29") && <option value="B3/29" >B3/29</option>}
                        {salesOffice == "PT Gading Serpong Properti" && salesExecutive == "Renny Rosely" && !filledUnits.includes("B9/9") && <option value="B9/9" >B9/9</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "William Chandra Tjiang" && !filledUnits.includes("B2/23") && <option value="B2/23" >B2/23</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Reza Alhadithia" && !filledUnits.includes("B9/10") && <option value="B9/10" >B9/10</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Kelvin Ang Luis" && !filledUnits.includes("B9/11") && <option value="B9/11" >B9/11</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Reza Alhadithia" && !filledUnits.includes("B5/27") && <option value="B5/27" >B5/27</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Gerry Lineker Armando Megawe" && !filledUnits.includes("B7/22") && <option value="B7/22" >B7/22</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Gerry Lineker Armando Megawe" && !filledUnits.includes("B2/26") && <option value="B2/26" >B2/26</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Shelvyana Wijayanti" && !filledUnits.includes("B1/30") && <option value="B1/30" >B1/30</option>}
                        {salesOffice == "PT Pratama Rumah Indonesia" && salesExecutive == "YUKI" && !filledUnits.includes("B9/2") && <option value="B9/2" >B9/2</option>}
                        {salesOffice == "PT Pratama Rumah Indonesia" && salesExecutive == "YUKI" && !filledUnits.includes("B8/20") && <option value="B8/20" >B8/20</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Gerry Lineker Armando Megawe" && !filledUnits.includes("B5/22") && <option value="B5/22" >B5/22</option>}
                        {salesOffice == "PT. Elitpro Gading Perkasa" && salesExecutive == "Swandy Sutanto" && !filledUnits.includes("B8/22") && <option value="B8/22" >B8/22</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Swandy Sutanto" && !filledUnits.includes("B2/29") && <option value="B2/29" >B2/29</option>}
                        {salesOffice == "PT Kurnia Mitra Harmoni" && salesExecutive == "Martinus Hendratha" && !filledUnits.includes("B9/7") && <option value="B9/7" >B9/7</option>}
                        {salesOffice == "PT Kurnia Mitra Harmoni" && salesExecutive == "Martinus Hendratha" && !filledUnits.includes("B9/6") && <option value="B9/6" >B9/6</option>}
                        {salesOffice == "PT Pintu Berkat Bersama" && salesExecutive == "Michael" && !filledUnits.includes("B3/26") && <option value="B3/26" >B3/26</option>}
                        {salesOffice == "PT Pratama Rumah Indonesia" && salesExecutive == "Hendri" && !filledUnits.includes("B1/28") && <option value="B1/28" >B1/28</option>}
                        {salesOffice == "PT Analis Properti Indonesia" && salesExecutive == "Corry Stefanie" && !filledUnits.includes("B1/26") && <option value="B1/26" >B1/26</option>}
                        {salesOffice == "PT Kemah Properti Indonesia" && salesExecutive == "Sharmaine Huberta A Dermawan" && !filledUnits.includes("B8/19") && <option value="B8/19" >B8/19</option>}
                        {salesOffice == "PT Pintar Properti Nusantara" && salesExecutive == "Putra Andika" && !filledUnits.includes("B2/28") && <option value="B2/28" >B2/28</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Gerry Lineker Armando Megawe" && !filledUnits.includes("B6/21") && <option value="B6/21" >B6/21</option>}
                        {salesOffice == "PT Momentum Properti Cemerlang" && salesExecutive == "Herman Yosef" && !filledUnits.includes("B9/3") && <option value="B9/3" >B9/3</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Gerry Lineker Armando Megawe" && !filledUnits.includes("B3/28") && <option value="B3/28" >B3/28</option>}
                        {salesOffice == "PT Kencana Abadi Propertindo" && salesExecutive == "William Handoko" && !filledUnits.includes("B8/15") && <option value="B8/15" >B8/15</option>}
                        {salesOffice == "PT Pratama Rumah Indonesia" && salesExecutive == "YUKI" && !filledUnits.includes("B7/25") && <option value="B7/25" >B7/25</option>}
                        {salesOffice == "PT. Tri Elemen Properti" && salesExecutive == "Vivi Hermin" && !filledUnits.includes("B1/20") && <option value="B1/20" >B1/20</option>}
                        {salesOffice == "PT. Sentosa Majujaya Propertin" && salesExecutive == "Jeffrey Hartanto" && !filledUnits.includes("B1/17") && <option value="B1/17" >B1/17</option>}
                        {salesOffice == "PT. Tri Elemen Properti" && salesExecutive == "Vivi Hermin" && !filledUnits.includes("B1/19") && <option value="B1/19" >B1/19</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Reza Alhadithia" && !filledUnits.includes("B1/16") && <option value="B1/16" >B1/16</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Deanry Irsan" && !filledUnits.includes("B1/21") && <option value="B1/21" >B1/21</option>}
                        {salesOffice == "PT Momentum Properti Cemerlang" && salesExecutive == "Yamin Tanutama" && !filledUnits.includes("B8/17") && <option value="B8/17" >B8/17</option>}
                        {salesOffice == "PT. Tri Elemen Properti" && salesExecutive == "Irene" && !filledUnits.includes("B5/12") && <option value="B5/12" >B5/12</option>}
                        {salesOffice == "PT Pratama Rumah Indonesia" && salesExecutive == "Kevin Krieski" && !filledUnits.includes("B3/16") && <option value="B3/16" >B3/16</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Deanry Irsan" && !filledUnits.includes("B6/18") && <option value="B6/18" >B6/18</option>}
                        {salesOffice == "PT. Catur Graha Sejahtera" && salesExecutive == "Zacharia Agusto Dumais" && !filledUnits.includes("B2/18") && <option value="B2/18" >B2/18</option>}
                      </select>
                      <br></br>
                      <label htmlFor="agent">Tolong Memilih Agen yang membantu Penjualan</label>

                      <select
                        type="text"
                        className="form-control"
                        id="agent"
                        value={agent}
                        onChange={(e) => setAgent(e.target.value)}
                      >
                        <option disabled value="">
                        Pilih Agen
                        </option>
                        <option value="Sutanto Ferdian">Sutanto Ferdian</option>
                        <option value="Alam Fajriansyah">Alam Fajriansyah                        </option>
                        <option value="William Oktavianus">William Oktavianus</option>

                      </select>
                    </form>
                    <div className=" mt-3">
                      <button className="btn btn-primary" disabled={agent === "" || unit === "" || salesExecutive === "" || salesOffice === ""} onClick={letGO}>Submit!</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div id="footer" className="et_builder_inner_content et_pb_gutters3">
        <div className="et_pb_section et_pb_section_0_tb_footer et_pb_with_background et_section_regular d-flex flex-column align-items-center">
          <div className="row p-4 w-100">
            <div className="col-12 text-center mt-2 p-2">
              <p style={{ fontSize: "150%" }}>
                <b>A joint venture company of</b>
              </p>
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center w-100">
            <div className="col-12 text-center pb-5">
              <img
                loading="lazy"
                decoding="async"
                src="https://hiera.co.id/wp-content/uploads/2022/10/hiera-bsd-perumahan-rumah-city-bumi-serpong-damai-jual-harga-tangerang-selatan-sinarmas-land-pt-sinar-mitbana-mas-the-heartland-of-mitbana-sinarmas-land-logo.png"
                alt="Sinar Mitbana Mas Logo"
                className="img-fluid"
                style={{ maxWidth: "50%", height: "auto" }}
              />
            </div>
          </div>
          <div className="row text-center w-100 mt-3">
            <div className="row-dith-modify-80 row align-items-center ">
              <div className="col-md-6 text-start">
                <p style={{ fontSize: "150%" }}>
                  <b>Connect with us through social media portals</b>
                </p>
                <div className="d-flex">
                  <a href="https://bit.ly/3DXaXgz" target="_blank" rel="noopener noreferrer" className="mx-2">
                    <img
                      decoding="async"
                      loading="lazy"
                      width="40px"
                      height="40px"
                      src="https://hiera.co.id/wp-content/uploads/2022/10/hiera-bsd-perumahan-rumah-city-bumi-serpong-damai-jual-harga-tangerang-selatan-sinarmas-land-pt-sinar-mitbana-mas-the-heartland-of-hiera-icon-64px_0003_fb.png"
                      alt="Facebook"
                      className="img-fluid"
                    />
                  </a>
                  <a href="https://www.instagram.com/hierabsd/" target="_blank" rel="noopener noreferrer" className="mx-2">
                    <img
                      decoding="async"
                      loading="lazy"
                      width="40px"
                      height="40px"
                      src="https://hiera.co.id/wp-content/uploads/2022/10/hiera-bsd-perumahan-rumah-city-bumi-serpong-damai-jual-harga-tangerang-selatan-sinarmas-land-pt-sinar-mitbana-mas-the-heartland-of-hiera-icon-64px_0002_ig.png"
                      alt="Instagram"
                      className="img-fluid"
                    />
                  </a>
                  <a href="https://www.tiktok.com/@hierabsd" target="_blank" rel="noopener noreferrer" className="mx-2">
                    <img
                      decoding="async"
                      loading="lazy"
                      width="40px"
                      height="40px"
                      src="https://hiera.co.id/wp-content/uploads/2022/10/hiera-bsd-perumahan-rumah-city-bumi-serpong-damai-jual-harga-tangerang-selatan-sinarmas-land-pt-sinar-mitbana-mas-the-heartland-of-hiera-icon-64px_0000_tiktok.png"
                      alt="TikTok"
                      className="img-fluid"
                    />
                  </a>
                  <a href="https://bit.ly/3UHncnj" target="_blank" rel="noopener noreferrer" className="mx-2">
                    <img
                      decoding="async"
                      loading="lazy"
                      width="40px"
                      height="40px"
                      src="https://hiera.co.id/wp-content/uploads/2022/10/hiera-bsd-perumahan-rumah-city-bumi-serpong-damai-jual-harga-tangerang-selatan-sinarmas-land-pt-sinar-mitbana-mas-the-heartland-of-hiera-icon-64px_0001_youtube.png"
                      alt="YouTube"
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>
              <div className="col-md-6 text-end">
                <img
                  decoding="async"
                  loading="lazy"
                  src="https://hiera.co.id/wp-content/uploads/2022/11/hiera-bsd-perumahan-rumah-city-bumi-serpong-damai-jual-harga-tangerang-selatan-sinarmas-land-pt-sinar-mitbana-mas-the-heartland-of-hiera-logo-3.png"
                  alt="Company Logo"
                  className="img-fluid"
                  style={{ maxWidth: "160px", height: "auto", maxHeight: "100%" }}
                />
              </div>
            </div>
          </div>
          <div className="row w-100 text-start mt-5 pt-5">
            <div className="row-dith-modify-80 row">
              <div className="col-md-2 margin-right-unique flex-fill">
                <h4>Business Hours</h4>
                <p className="dumb-link-color nav-link fs-6">
                  Monday to Sunday:<br />
                  8:30 AM-5:30 PM
                </p>
              </div>
              <div className="col-md-2 margin-right-unique flex-fill">
                <h4>Marketing Gallery</h4>
                <p className="dumb-link-color nav-link fs-6">
                  The Breeze – Lake Level L. 03 Jl. BSD Grand Boulevard blok L no. L03 Green Office Park –
                  BSD City Sampora – Kab. Tangerang Banten 15345
                </p>
              </div>
              <div className="col-md-2 margin-right-unique flex-fill">
                <h4>Our Social Media</h4>

                <ul className="list-unstyled">
                  <li className="mt-2 d-flex align-items-center">
                    <img
                      decoding="async"
                      loading="lazy"
                      width="32px"
                      height="32px"
                      src="https://hiera.co.id/wp-content/uploads/2022/10/hiera-bsd-perumahan-rumah-city-bumi-serpong-damai-jual-harga-tangerang-selatan-sinarmas-land-pt-sinar-mitbana-mas-the-heartland-of-hiera-icon-64px_0003_fb.png"
                      alt="Facebook"
                      className="img-fluid"
                    />
                    <a className="ps-3 dumb-link-color nav-link fs-6" href="https://bit.ly/3DXaXgz">Facebook</a>
                  </li>
                  <li className="mt-2 d-flex align-items-center">
                    <img
                      decoding="async"
                      loading="lazy"
                      width="32px"
                      height="32px"
                      src="https://hiera.co.id/wp-content/uploads/2022/10/hiera-bsd-perumahan-rumah-city-bumi-serpong-damai-jual-harga-tangerang-selatan-sinarmas-land-pt-sinar-mitbana-mas-the-heartland-of-hiera-icon-64px_0002_ig.png"
                      alt="Instagram"
                      className="img-fluid"
                    />
                    <a className="ps-3 dumb-link-color nav-link fs-6" href="https://www.instagram.com/hierabsd/">Instagram</a></li>
                  <li className="mt-2 d-flex align-items-center">
                    <img
                      decoding="async"
                      loading="lazy"
                      width="32px"
                      height="32px"
                      src="https://hiera.co.id/wp-content/uploads/2022/10/hiera-bsd-perumahan-rumah-city-bumi-serpong-damai-jual-harga-tangerang-selatan-sinarmas-land-pt-sinar-mitbana-mas-the-heartland-of-hiera-icon-64px_0000_tiktok.png"
                      alt="TikTok"
                      className="img-fluid"
                    /><a className="ps-3 dumb-link-color nav-link fs-6" href="https://www.tiktok.com/@hierabsd">TikTok</a></li>
                  <li className="mt-2 d-flex align-items-center">
                    <img
                      decoding="async"
                      loading="lazy"
                      width="32px"
                      height="32px"
                      src="https://hiera.co.id/wp-content/uploads/2022/10/hiera-bsd-perumahan-rumah-city-bumi-serpong-damai-jual-harga-tangerang-selatan-sinarmas-land-pt-sinar-mitbana-mas-the-heartland-of-hiera-icon-64px_0001_youtube.png"
                      alt="YouTube"
                      className="img-fluid"
                    /><a className="ps-3 dumb-link-color nav-link fs-6" href="https://bit.ly/3UHncnj">YouTube</a></li>
                </ul>
              </div>
              <div className="col-md-2 margin-right-unique flex-fill" >
                <h4>Menu</h4>
                <ul className="list-unstyled">
                  <li><a className="dumb-link-color nav-link fs-6" href="/news/">News &amp; Event</a></li>
                  <li><a className="dumb-link-color nav-link fs-6" href="/3d-virtual/">3D Virtual</a></li>
                  <li><a className="dumb-link-color nav-link fs-6" href="/contact-us/">Contact Us</a></li>
                  <li><a className="dumb-link-color nav-link fs-6" href="/disclaimer/">Disclaimer</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row w-100 text-center mt-4">
          <div className="col-12">
            <p className="dumb-link-color nav-link fs-6" >© 2022-2025 <a className="dumb-link-color" href="http://www.sinarmasland.com/">PT Sinar Mitbana Mas</a>. All rights reserved. | Version 3.0</p>
          </div>
        </div>
      </div >

    </>
  );
}