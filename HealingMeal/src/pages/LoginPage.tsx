import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../styles/LoginPage.module.less";
import CustomAxios from "../api/Axios.tsx";
import "../index.css";
import Footer from "../components/Footer.tsx";
const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [idMessage, setIDMessage] = useState<string>("");
  const [loginMessage, setLoginMessage] = useState<string>("");
  const [isid, setIsid] = useState<boolean>(false);
  const [ispassword, setIspassword] = useState<boolean>(false);
  const formData = new FormData();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isid && ispassword) {
      try {
        formData.append("loginId", id);
        formData.append("password", password);

        const response = await CustomAxios.post("/user/login", formData);

        if (response.status === 200) {
          navigate("/");
          console.log("로그인 성공!");
        }
      } catch (error) {
        console.log(error);
        setLoginMessage("아이디 또는 비밀번호를 잘못 입력했습니다.");
      }
    } else {
      if (!isid) setIDMessage("아이디를 입력해주세요.");
      if (!ispassword) setPasswordMessage("비밀번호를 입력해주세요.");
    }
  };

  const onChangeID = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setID(e.target.value);
    if (e.target.value === "") {
      setIDMessage("아이디: 필수 정보입니다.");
      setIsid(false);
    } else {
      setIDMessage("");
      setIsid(true);
    }
  };

  const onChangePW = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value === "") {
      setPasswordMessage("비밀번호: 필수 정보입니다.");
      setIspassword(false);
    } else {
      setPasswordMessage("");
      setIspassword(true);
    }
  };

  return (
    <div className={styles.LoginPage_Container}>
      <header>
        <div className={styles.logo}>
          <img src="/images/logo2.png" />
          <p>Healing Meal</p>
        </div>
        <div className={styles.Link_Box}>
          <div>
            <Link to="/findid">아이디 찾기</Link>
          </div>
          <div>
            <Link to="/findPw">비밀번호 찾기</Link>
          </div>
          <div>
            <Link to="/signup">회원가입</Link>
          </div>
        </div>
      </header>

      <div className={styles.LoginPage}>
        <div className={styles.Page1}>
          <div className={styles.LoginBox1}>
            <p>Healing Meal</p>
            <form>
              <div className={styles.LoginBox2}>
                <div className={styles.idbox}>
                  <img src="/images/person.svg" />
                  <input
                    type="text"
                    placeholder="아이디"
                    value={id}
                    onChange={onChangeID}
                  />
                </div>
                <div>
                  <img src="/images/lock.svg" />
                  <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={onChangePW}
                  />
                </div>
              </div>
              <ul className={styles.messagebox}>
                {idMessage && <li>•{idMessage}</li>}
                {passwordMessage && <li>•{passwordMessage}</li>}
                {loginMessage && <li>•{loginMessage}</li>}
              </ul>
              <button
                type="submit"
                className={styles.certification_btn}
                onClick={login}
              >
                로그인
              </button>
              <div className={styles.linkbox}></div>
            </form>
          </div>
        </div>
        <div className={styles.Page2}>
          <p className={styles.Page2_textBox}>
            <strong>
              FIND YOUR
              <br />
              PERSONALIZED
              <br />
              DIABETES MEAL PLAN
            </strong>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
