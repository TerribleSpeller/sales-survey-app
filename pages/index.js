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
    const dbRef = ref(db, "agentSurvey2/readOfFilled/");
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

    await set(ref(db, 'agentSurvey2/' + generateID()), data)
      .then(async () => {
        await set(ref(db, 'agentSurvey2/readOfFilled/' + generateID()), unit).catch((error) => {
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
                    Terima Kasih telah menjadi agents setia HIERA.                  </p>
                  <p>
                    Kami ingin mengundang Anda untuk memilih Koordinator Agent HIERA yang paling mendukung Anda selama proses transaksi dengan HIERA.                  </p>
                  <p>
                    Masukan Anda membantu kami menghargai pelayanan yang baik dan terus meningkatkan pengalaman pelanggan.                  </p>
                </div>
              </div>
              <div className="container">
                <div className="col">
                  <div className="col-5">
                    {success && <div className="alert alert-success">{success}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form>
                      <label htmlFor="unit">Pilih Sales Office Anda</label>
                      <select
                        type="text"
                        className="form-control"
                        id="unit"
                        value={salesOffice}
                        onChange={(e) => setSalesOffice(e.target.value)}
                      >
                        <option default value="">
                          Pilih Sales Office Anda
                        </option>
                        <option value="PT. Asia Rumah Utama">PT. Asia Rumah Utama</option>
                        <option value="PT Sukses Muda Sejati">PT. Sukses Muda Sejati</option>
                        <option value="PT Pintar Properti Nusantara">PT Pintar Properti Nusantara</option>
                        <option value="PT Momentum Properti Cemerlang">PT Momentum Properti Cemerlang</option>
                        <option value="PT. Catur Graha Sejahtera">PT. Catur Graha Sejahtera</option>
                        <option value="PT Analis Properti Indonesia">PT Analis Properti Indonesia</option>
                        <option value="PT EMPAT PILAR PROPERTI">PT EMPAT PILAR PROPERTI</option>
                        <option value="PT Citra Media Propertindo">PT Citra Media Propertindo</option>
                        <option value="PT Kerabat Muda Maju Bersama">PT Kerabat Muda Maju Bersama</option>
                        <option value="PT Dimitra Millenium Group">PT Dimitra Millenium Group</option>
                        <option value="PT Sentosa Majujaya Propertind">PT Sentosa Majujaya Propertind</option>
                        <option value="PT Indonesia Properti Developm">PT Indonesia Properti Developm</option>
                        <option value="PT Generasi Properti Nusantara">PT Generasi Properti Nusantara</option>
                        <option value="PT Multi Infiniti Propertindo">PT Multi Infiniti Propertindo</option>
                      </select>
                      <br />

                      <label htmlFor="agent">Pilih Nama Anda (Sales Executive)</label>
                      <select
                        className="form-select"
                        id="agent"
                        value={salesExecutive}
                        onChange={(e) => setSalesExecutive(e.target.value)}
                      >
                        <option default value="">
                          Pilih Sales Exeuctive
                        </option>

                        {salesOffice == "PT Pintar Properti Nusantara" && <option value="Putra Andika" >Putra Andika</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && <option value="Keven" >Keven</option>}
                        {salesOffice == "PT Sukses Muda Sejati" && <option value="Kevin Julian" >Kevin Julian</option>}
                        {salesOffice == "PT Momentum Properti Cemerlang" && <option value="Putri Pratiwi Sari" >Putri Pratiwi Sari</option>}
                        {salesOffice == "PT. Catur Graha Sejahtera" && <option value="Dodi Asfera Aripin" >Dodi Asfera Aripin</option>}
                        {/* {salesOffice == "PT. Asia Rumah Utama" && <option value="Gerry Lineker Armando Megawe" >Gerry Lineker Armando Megawe</option>} */}
                        {salesOffice == "PT. Asia Rumah Utama" && <option value="Reza Alhadithia" >Reza Alhadithia</option>}
                        {salesOffice == "PT Analis Properti Indonesia" && <option value="Febrico" >Febrico</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && <option value="Cornelius" >Cornelius</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && <option value="Gerry Lineker Armando Megawe" >Gerry Lineker Armando Megawe</option>}
                        {/* {salesOffice == "PT. Asia Rumah Utama" && <option value="Keven" >Keven</option>} */}
                        {salesOffice == "PT Momentum Properti Cemerlang" && <option value="Fenley Wijaya" >Fenley Wijaya</option>}
                        {salesOffice == "PT EMPAT PILAR PROPERTI" && <option value="Suhandy Jaya Priatna Karya" >Suhandy Jaya Priatna Karya</option>}
                        {salesOffice == "PT Citra Media Propertindo" && <option value="Sulaiman Wibifono" >Sulaiman Wibifono</option>}
                        {salesOffice == "PT Analis Properti Indonesia" && <option value="Kaisar Hansel" >Kaisar Hansel</option>}
                        {salesOffice == "PT Kerabat Muda Maju Bersama" && <option value="Stephen" >Stephen</option>}
                        {salesOffice == "PT Dimitra Millenium Group" && <option value="Noel Christopher Rahardjo" >Noel Christopher Rahardjo</option>}
                        {salesOffice == "PT Sentosa Majujaya Propertind" && <option value="Jeffrey Hartanto" >Jeffrey Hartanto</option>}
                        {salesOffice == "PT Indonesia Properti Developm" && <option value="Toto Indarto Primadhani" >Toto Indarto Primadhani</option>}
                        {salesOffice == "PT Generasi Properti Nusantara" && <option value="Aristyo" >Aristyo</option>}
                        {salesOffice == "PT Multi Infiniti Propertindo" && <option value="David" >David</option>}
                        {salesOffice == "PT Momentum Properti Cemerlang" && <option value="Calvin Susanto" >Calvin Susanto</option>}
                        {salesOffice == "PT Momentum Properti Cemerlang" && <option value="Nia Priscilia" >Nia Priscilia</option>}

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
                          Pilih Unit yang dijual
                        </option>
                        <option disabled value="">
                          Jika Unit tidak ditemukan - berarti unit sudah terisi
                        </option>
                        {/* Enjoy copy paste hell!*/}




                        B3/31	Wynyard	PT Pintar Properti Nusantara	Putra Andika
                        {salesOffice == "PT Pintar Properti Nusantara" && salesExecutive == "Putra Andika" && !filledUnits.includes("B3/31") && <option value="B3/31" >B3/31 (Wynyard)</option>}

                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Keven" && !filledUnits.includes("B3/21") && <option value="B3/21" >B3/21 (Wynyard)</option>}
                        {salesOffice == "PT Sukses Muda Sejati" && salesExecutive == "Kevin Julian" && !filledUnits.includes("B5/20") && <option value="B5/20" >B5/20 (Wynyard)</option>}
                        {salesOffice == "PT Momentum Properti Cemerlang" && salesExecutive == "Putri Pratiwi Sari" && !filledUnits.includes("B1/15") && <option value="B1/15" >B1/15 (Wynyard)</option>}
                        {salesOffice == "PT. Catur Graha Sejahtera" && salesExecutive == "Dodi Asfera Aripin" && !filledUnits.includes("B5/18") && <option value="B5/18" >B5/18 (Wynyard)</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Gerry Lineker Armando Megawe" && !filledUnits.includes("B2/17") && <option value="B2/17" >B2/17 (Wynyard)</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Reza Alhadithia" && !filledUnits.includes("B2/21") && <option value="B2/21" >B2/21 (Wynyard)</option>}
                        {salesOffice == "PT Analis Properti Indonesia" && salesExecutive == "Febrico" && !filledUnits.includes("B2/19") && <option value="B2/19" >B2/19 (Wynyard)</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Cornelius" && !filledUnits.includes("B7/20") && <option value="B7/20" >B7/20 (Wynyard)</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Gerry Lineker Armando Megawe" && !filledUnits.includes("B2/20") && <option value="B2/20" >B2/20 (Wynyard)</option>}
                        {salesOffice == "PT. Asia Rumah Utama" && salesExecutive == "Keven" && !filledUnits.includes("B1/6") && <option value="B1/6" >B1/6 (Wynyard)</option>}
                        {salesOffice == "PT Momentum Properti Cemerlang" && salesExecutive == "Fenley Wijaya" && !filledUnits.includes("B1/5") && <option value="B1/5" >B1/5 (Wynyard)</option>}
                        {salesOffice == "PT EMPAT PILAR PROPERTI" && salesExecutive == "Suhandy Jaya Priatna Karya" && !filledUnits.includes("B1/9") && <option value="B1/9" >B1/9 (Wynyard)</option>}
                        {salesOffice == "PT Citra Media Propertindo" && salesExecutive == "Sulaiman Wibifono" && !filledUnits.includes("B8/12") && <option value="B8/12" >B8/12 (Wynyard)</option>}
                        {salesOffice == "PT Analis Properti Indonesia" && salesExecutive == "Kaisar Hansel" && !filledUnits.includes("B7/23") && <option value="B7/23" >B7/23 (Wynyard)</option>}
                        {salesOffice == "PT Kerabat Muda Maju Bersama" && salesExecutive == "Stephen" && !filledUnits.includes("B2/16") && <option value="B2/16" >B2/16 (Wynyard)</option>}
                        {salesOffice == "PT Dimitra Millenium Group" && salesExecutive == "Noel Christopher Rahardjo" && !filledUnits.includes("B5/15") && <option value="B5/15" >B5/15 (Wynyard)</option>}
                        {salesOffice == "PT Sentosa Majujaya Propertind" && salesExecutive == "Jeffrey Hartanto" && !filledUnits.includes("A2/50") && <option value="A2/50" >A2/50 (Welton Signature)</option>}
                        {salesOffice == "PT Indonesia Properti Developm" && salesExecutive == "Toto Indarto Primadhani" && !filledUnits.includes("B2/11") && <option value="B2/11" >B2/11 (Welton Signature)</option>}
                        {salesOffice == "PT Generasi Properti Nusantara" && salesExecutive == "Aristyo" && !filledUnits.includes("B5/33") && <option value="B5/33" >B5/33 (Welton)</option>}
                        {salesOffice == "PT Multi Infiniti Propertindo" && salesExecutive == "David" && !filledUnits.includes("B2/21") && <option value="B2/21" >B2/21 (Welton Signature)</option>}
                        {salesOffice == "PT Momentum Properti Cemerlang" && salesExecutive == "Calvin Susanto" && !filledUnits.includes("A7/1") && <option value="A7/1" >A7/1 (Welton)</option>}
                        {salesOffice == "PT Momentum Properti Cemerlang" && salesExecutive == "Nia Priscilia" && !filledUnits.includes("B2/7") && <option value="B2/7" >B2/7 (Welton Signature)</option>}

                      </select>
                      <br></br>
                      <label htmlFor="agent">Mohon masukan pilihan Agent Coordinator HIERA yang membantu Anda:</label>

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

                      </select>
                    </form>
                    <label htmlFor="agent">Terima Kasih atas masukan Anda</label>

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