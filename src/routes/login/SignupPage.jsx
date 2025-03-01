import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser, checkEmailAvailability } from '../../libs/apis/signin';
import emailicon from '../../assets/emailicon.png';
import passwordicon from '../../assets/passwordicon.png';
import usernameicon from '../../assets/usernameicon.png';
import ButtonActive from '../../components/button/ButtonActive';
import check from '../../assets/check.svg';
import BackBtn from '../../assets/cheveron-left.svg';

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [signupError, setSignupError] = useState('');

  const photoUrls = [
    "https://upload.wikimedia.org/wikipedia/commons/5/5a/SOL%EC%BA%90%EB%A6%AD%ED%84%B0.png",
    "https://i.postimg.cc/Cxrnj1Kb/rino.png",
    "https://i.postimg.cc/NMmyqkkx/shoo.png",
    "https://i.postimg.cc/fybhjwy0/image.png",
    "https://i.postimg.cc/CMv0MfrC/image.png",
    "https://i.postimg.cc/KvwyBh2R/image.png"
  ];
  
  const getRandomPhoto = () => {
    const randomIndex = Math.floor(Math.random() * photoUrls.length);
    return photoUrls[randomIndex];
  };
  
  const photo = getRandomPhoto();

  const handleNameBlur = () => {
    if (name.length < 2) {
      setNameMessage('이름을 2글자 이상 입력해주세요.');
    } else {
      setNameMessage('이름이 정상적으로 입력되었습니다.');
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value.length >= 2) {
      setNameMessage('');
    }
  };

  const handleEmailChange = async (e) => {
    const newId = e.target.value;
    setId(newId);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (newId.length === 0) {
      setEmailMessage('이메일을 입력해주세요');
    } else if (!emailRegex.test(newId)) {
      setEmailMessage('사용 불가능한 이메일입니다');
    } else {
      try {
        const emailCheckResponse = await checkEmailAvailability(newId);
        if (emailCheckResponse.success) {
          if (emailCheckResponse.response === '중복된 이메일입니다.') {
            setEmailMessage('이미 사용 중인 이메일입니다.');
          } else {
            setEmailMessage('사용 가능한 이메일입니다.');
          }
        } else {
          setEmailMessage('잠시 후에 다시 시도해주세요.');
        }
      } catch (error) {
        setEmailMessage('잠시 후에 다시 시도해주세요.');
      }
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{1,15}$/;
    setPassword(newPassword);
    setPasswordValid(passwordRegex.test(newPassword));
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  const [status, setStatus] = useState(0);
  const [signUpMessage, setSignUpMessage] = useState("");
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const handleSignupComplete = async () => {
    // alert('회원가입 완료');
    if (
      name.length >= 2 &&
      emailMessage === '사용 가능한 이메일입니다.' &&
      passwordValid &&
      passwordMatch
    ) {
      try {
        const response = await signupUser(id, password, name, 0, photo);
        if (response.success) {
          setSignUpMessage("회원 가입 완료");
          setStatus(0);
          // alert('회원가입 완료');
          // navigate('/login');
        } else {
          const errorMessage = response.error?.errorMessage;
          if (typeof errorMessage === 'string') {
            // setSignupError(errorMessage);
            setSignUpMessage(errorMessage);
          } else if (errorMessage?.password) {
            // setSignupError(errorMessage.password);
            setSignUpMessage(errorMessage.password);
          } else {
            // setSignupError('잠시 후에 다시 시도해주세요.');
            setSignUpMessage('잠시 후에 다시 시도해주세요.')
          }
          setStatus(1);
        }
      } catch (error) {
        // setSignupError('잠시 후에 다시 시도해주세요.');
        setSignUpMessage('잠시 후에 다시 시도해주세요.')
        setStatus(1);
      }
    } else {
      // setSignupError('모든 필드를 올바르게 입력해주세요.');
      setSignUpMessage('모든 필드를 올바르게 입력해주세요.')
      setStatus(1);
    }
    setIsOpenAlert(true);
  };

  return (
    <div className=" w-full flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {isOpenAlert ? <AlertModal status={status} message={signUpMessage} setIsOpenAlert={() => setIsOpenAlert(false)}/> : null}
      <div className="absolute top-8 left-4 text-black" onClick={() => navigate('/login')}>
        <img src={BackBtn} alt="Logo" className="w-8 h-8" />
      </div>
      <div className="w-11/12 max-w-sm mt-4">
        <div className="space-y-3">
          <div className="flex items-center border rounded-xl shadow-md">
            <img src={usernameicon} alt="Profile Icon" className="w-6 h-6 ml-3" />
            <input
              type="text"
              placeholder="이름"
              className="w-full px-4 py-2 text-black border-none focus:outline-none focus:ring-0"
              value={name}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
            />
          </div>
          <p className="h-6" style={{ color: nameMessage === '이름이 정상적으로 입력되었습니다.' ? '#0046ff' : '#EE4D2A' }}>{nameMessage}</p>
          <div className="flex items-center border rounded-xl shadow-md">
            <img src={emailicon} alt="Email Icon" className="w-6 h-6 ml-3" />
            <input
              type="text"
              placeholder="이메일"
              className="w-full px-4 py-2 text-black border-none focus:outline-none focus:ring-0"
              value={id}
              onChange={handleEmailChange}
              onBlur={handleEmailChange}
            />
          </div>
          <p className="h-6" style={{ color: emailMessage === '사용 가능한 이메일입니다.' ? '#0046ff' : '#EE4D2A' }}>{emailMessage}</p>
          <div className="flex items-center border rounded-xl shadow-md">
            <img src={passwordicon} alt="Password Icon" className="w-6 h-6 ml-3" />
            <input
              type="password"
              placeholder="비밀번호"
              className="w-full px-4 py-2 text-black border-none focus:outline-none focus:ring-0"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <p className="h-6" style={{ color: passwordValid ? '#0046ff' : '#EE4D2A' }}>
            {password && (passwordValid ? '사용 가능한 비밀번호입니다' : '사용 불가능한 비밀번호입니다')}
          </p>
          <div className="flex items-center border rounded-xl shadow-md">
            <img src={passwordicon} alt="Password Confirm Icon" className="w-6 h-6 ml-3" />
            <input
              type="password"
              placeholder="비밀번호 확인"
              className="w-full px-4 py-2 text-black border-none focus:outline-none focus:ring-0"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
            />
          </div>
          <p className="h-6" style={{ color: passwordMatch ? '#0046ff' : '#EE4D2A' }}>
            {passwordConfirm && (passwordMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.')}
          </p>
          <div className="flex flex-col items-center space-y-4">
            <button
              className="w-2/3 px-4 py-2 text-white bg-[#0046FF] rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#94caff]"
              onClick={handleSignupComplete}
            >
              회원가입
            </button>
          </div>
          <p className="h-6 text-center" style={{ color: '#EE4D2A' }}>{signupError}</p>
        </div>
      </div>
    </div>
  );
}

const AlertModal = ({ status, message, setIsOpenAlert }) => {
	const navigate = useNavigate();

  const clickBtn = () => {
    if(status === 0){
      navigate('/login')
    } else {
      setIsOpenAlert();
    }
  }

	return (
		<div className="absolute z-10 flex items-center justify-center w-screen h-screen">
			<div className="absolute w-full h-full bg-gray-300 opacity-50 z-11" />
			<div className="fixed shadow-md bg-white rounded-[30px] z-20 p-10 flex flex-col items-center gap-5 animate-slide-down">
				<div className="flex justify-center gap-1">
					<img src={check} className="w-7 h-7" />
					<span className="font-bold text-[18px] text-center whitespace-pre-line">
						{message}
					</span>
				</div>
				<div className="flex items-center justify-center w-full">
					<ButtonActive
						btnTxt="확인"
						isConfirm={true}
						clickBtn={() => clickBtn(status)}
					/>
				</div>
			</div>
		</div>
	);
};