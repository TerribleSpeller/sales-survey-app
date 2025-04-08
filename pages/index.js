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

  const letGO = async () => {
    if (agent === '' || unit === '') {
      alert('Please fill in all fields');
      return;
    }

    const data = {
      agent: agent,
      unit: unit,
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
      .then(() => {
        // alert('Data submitted successfully');
        setAgent('');
        setUnit('');
        setSuccess('Data submitted successfully');
        setTimeout(() => {
          setSuccess('');
        }
          , 3000);
        router.push('https://hiera.co.id/');

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
                      src="logo.png"
                      className="img-fluid dark"
                      alt="Logo"
                      style={{ maxWidth: "40%" }}
                    />
                  </a>
                  <a className="navbar-brand d-flex justify-content-end" href="/">
                    <img
                      src="logo2.png"
                      className="img-fluid dark"
                      alt="Logo"
                      style={{ maxWidth: "20%" }}
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
                </div>
              </div>
              <div className="container">
                <div className="col">
                  <div className="col-5">
                    {success && <div className="alert alert-success">{success}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form>
                      <label htmlFor="unit">Seller Unit</label>
                      <input
                        type="text"
                        className="form-control"
                        id="unit"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                      />
                      <label htmlFor="agent">Agent Name</label>
                      <select
                        className="form-select"
                        id="agent"
                        value={agent}
                        onChange={(e) => setAgent(e.target.value)}
                      >
                        <option disabled value="">
                          Select Agent
                        </option>
                        <option value="Sutanto Ferdian">Sutanto Ferdian                        </option>
                        <option value="Alam Fajriansyah">Alam Fajriansyah                        </option>
                        <option value="William Oktavianus">William Oktavianus</option>
                      </select>
                    </form>
                    <div className=" mt-3">
                      <button className="btn btn-primary" onClick={letGO}>Submit!</button>
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