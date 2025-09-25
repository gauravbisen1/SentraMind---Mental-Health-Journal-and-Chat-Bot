import React from 'react'
import "./footer.css"
import logo from "../../assets/sun.png"

const footer = () => {
  return (
    <>
      <div className="footer section__padding">
      <div className="footer-heading">
        <h1 className="gradient__text">
        Your thoughts deserve a safe space — let AI be your mindful companion.
        </h1>
      </div>
      <div className="footer-button">
        <p>Mental Health Chat Bot</p>
      </div>
      <div className="footer-links">
        <div className="footer-links_logo green-filter">
          <img src={logo} alt="gpt3 logo" />
          <p>Indore K12 182 DK, All Rights Reserved</p>
        </div>
        <div className="footer-links_div">
          <h4>Links</h4>
          <p>Overons</p>
          <p>Social Media</p>
          <p>Counters</p>
          <p>Contact</p>
        </div>
        <div className="footer-links_div">
          <h4>Company</h4>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
          <p>Contact</p>
        </div>
        <div className="footer-links_div">
          <h4>Get in touch</h4>
          <p>Indore K12 182 DK </p>
          <p>+91 9111111111</p>
          <p>support@sentramind.org</p>
        </div>
      </div>
      <div className="footer-copyrights">
        ©2025 SentraMind. All rights reserved.
      </div>
    </div>
    </>
  )
}

export default footer