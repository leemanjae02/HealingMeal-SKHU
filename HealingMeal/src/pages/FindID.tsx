import { useForm } from "../hooks/useForm.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAxios from "../api/Axios.tsx";
import styles from "../styles/FindPage.module.less";
import Footer from "../components/Footer.tsx";
import "../index.css";
const FindIDPage = () => {
  const navigate = useNavigate();
  const [name, onChangeName] = useForm();
  const [email, onChangeEmail] = useForm();
  const [answer, setAnswer] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [changeBtn, setChangeBtn] = useState<boolean>(false);

  const FindID = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setMessage("이름과 이메일을 모두 입력해주세요.");
      return;
    } else {
      setMessage("");
    }
    try {
      const response = await CustomAxios.get(
        `/user/search/id?name=${name}&email=${email}`
      );
      if (response.status === 200) {
        setChangeBtn(true);
        setAnswer(response.data);
      }
    } catch (error) {
      setMessage("이름과 이메일을 다시 확인하고 입력해주세요.");
      console.log(error);
    }
  };

  const clickLogin = () => {
    navigate("/login");
  };

  console.log(name);
  return (
    <div className={styles.Container}>
      <header>
        <div className={styles.logo}>
          <img src="/images/logo2.png" />
          <p>Healing Meal</p>
        </div>
      </header>
      <hr />
      <div className={styles.Box}>
        <div className={styles.textbox}>
          <div className={styles.text}>
            <strong>회원 정보에 등록한 정보로 인증</strong>
            <p>회원정보에 등록한 정보가 모두 같아야, 인증이 가능합니다.</p>
          </div>
          <div className={styles.Form_div}>
            <form>
              <div className={styles.InputBox}>
                <div className={styles.InforInput}>
                  <table>
                    <tbody>
                      <tr>
                        <th>이름</th>
                        <td>
                          <input
                            type="text"
                            placeholder="이름"
                            value={name}
                            onChange={onChangeName}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>이메일</th>
                        <td>
                          {" "}
                          <input
                            type="email"
                            placeholder="이메일"
                            value={email}
                            onChange={onChangeEmail}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </form>
            <div className={styles.msgBox}>
              <div className={styles.FindId_message_box}>
                {message && <p>•{message}</p>}
              </div>
              {answer && (
                <div className={styles.answerBox}>
                  <div>{answer}</div>
                </div>
              )}
            </div>
          </div>
        </div>
        {changeBtn ? (
          <button
            className={styles.next_Btn}
            type="submit"
            onClick={clickLogin}
          >
            로그인
          </button>
        ) : (
          <button className={styles.next_Btn} type="submit" onClick={FindID}>
            요청
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FindIDPage;
