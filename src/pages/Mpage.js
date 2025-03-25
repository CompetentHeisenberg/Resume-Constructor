import React from "react";
import style from "../css/mpage.module.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import headerstyle from "../css/header.module.css";
import footerstyle from "../css/footer.module.css";
import Label from "../components/Label";
import Button from "../components/RegButton";
function Mpage() {
  return (
    <div className={style.mainpage}>
      <Header style={headerstyle.main}></Header>
      <div className={style.maininfo}>
        <div className={style.leftmain}>
          <Label style={style.labelmain} text={"The professional"}></Label>
          <Label style={style.labelsupport} text={"Resume Builder"}></Label>
          <Label
            style={style.labeldesc}
            text={"Only 2% of resumes win. Yours will be one of them."}
          ></Label>
          <Label
            style={style.labeldesc1}
            text={"Lets build you a resume that works."}
          ></Label>
          <Button style={style.button}>Create my Resume</Button>
        </div>
        <div className={style.rightmain}>
          <img src="/resume-main.jpg" alt="Resume Example"></img>
        </div>
      </div>
      <Footer style={footerstyle.main}></Footer>
    </div>
  );
}

export default Mpage;
