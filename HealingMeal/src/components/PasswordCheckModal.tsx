import { useState } from "react";
import styles from "../styles/PasswordCheck.module.less";
interface PasswordCheckProps {
  setCheckPassword: (checkPassword: string) => void;
  onClose: () => void;
  checkPasswordMSG: string;
  getPassword: () => void;
}

const PasswordCheckModal: React.FunctionComponent<PasswordCheckProps> = ({
  setCheckPassword,
  checkPasswordMSG,
  getPassword,
}) => {
  const [password, setPassword] = useState<string>("");
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const upDatePassword = e.target.value;
    setPassword(upDatePassword);
    setCheckPassword(upDatePassword);
  };
  return (
    <div className={styles.Modal}>
      <div className={styles.Modal_text}>
        <p className={styles.PasswordMSG}>비밀번호를 입력해주세요.</p>
        <div className={styles.PasswordInput}>
          <input type="password" value={password} onChange={onChangePassword} />
        </div>
        <p className={styles.PasswordCheckMSG}>{checkPasswordMSG}</p>
      </div>
      <div className={styles.Modal_btn}>
        <button onClick={getPassword}>확인</button>
      </div>
    </div>
  );
};

export default PasswordCheckModal;
