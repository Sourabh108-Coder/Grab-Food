import React from 'react'
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Globe } from "lucide-react";

const Footer = () => {
  return (
    <div className='foot'>

        <div className='google' id='but2'>

           <img src="https://media.tenor.com/mjnz9xrA308AAAAi/food-lover.gif"/>

           <div className='sec-div'>
                <h1 className='exp'>For Better Experience Download <br/>  
                <img src="https://tse2.mm.bing.net/th?id=OIP.TWXYdjQIRGSOdvVJq73IXwHaBX&pid=Api&P=0&h=180" className='logo2' id='tom'/></h1>

                <div className='down-img'>
                    <img src="https://tse3.mm.bing.net/th?id=OIP.gs7YpYNFnIOM7BALglxmVAHaBJ&pid=Api&P=0&h=180" className='goo'/>
                </div>
               </div>
        </div>
        <div className='line'></div>

      <div className="last-section" id='but3'>
            <div className="last-sec-cont1">

                <div className="last-sec-cont-left">
                    <div className="sec-head">
                        <img src="https://media2.giphy.com/media/KfxPgR9Xb6lRvlFa8x/source.gif"
                            alt="sec-logo" className="sec-logo"/>
                       <img src="https://tse2.mm.bing.net/th?id=OIP.TWXYdjQIRGSOdvVJq73IXwHaBX&pid=Api&P=0&h=180" className='logo2'/>
                    </div>

                    <p className="sec-para">Seamless eating for brighter life</p>

                    <div className="logo-of-img">
                        <a href='https://github.com/Sourabh108-Coder'><FaGithub className="logo1" /></a>
                        <a href='https://www.linkedin.com/in/sourabh-kumar-407079267/'><FaLinkedin className="logo1" /></a>
                        <a href='https://thesourabh.pythonanywhere.com/'><Globe className="logo1" /></a>

                        
                    </div>
                </div>
                <div className="last-sec-cont-right">

                    <div className="grid-div-1">
                        <ul className="list1">
                            <li id="list-head">Products</li>
                            <li>Overview</li>
                            <li>Solutions</li>
                            <li>Pricing</li>
                            <li>Customer</li>
                        </ul>
                    </div>

                    <div className="grid-div-1">
                        <ul className="list1">
                            <li id="list-head">Company</li>
                            <li>About</li>
                            <li>Invertor Relations</li>
                            <li>Jobs</li>
                            <li>Press</li>
                            <li>Blog</li>
                        </ul>
                    </div>

                    <div className="grid-div-1">
                        <ul className="list1">
                            <li id="list-head">Support</li>
                            <li>Contact</li>
                            <li>Documentation</li>
                            <li>Chat</li>
                            <li>FAQ</li>
                        </ul>
                    </div>

                    <div className="grid-div-1">
                        <ul className="list1">
                            <li id="list-head">Legal</li>
                            <li>Terms of Service</li>
                            <li>Privacy Policy</li>
                            <li>Contact Settings</li>
                        </ul>

                    </div>

                </div>
            </div>

            <div className="last-sec-cont-2">
                <p className="reserved-para"> © 2024: Present GrabFood. All Rights Reversed PVT LTD....</p>
            </div>
        </div>

      
    </div>
  )
}

export default Footer
