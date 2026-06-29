import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [getResponse, setGetResponse] = useState('');
  const [postResponse, setPostResponse] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // 1. JSP로 GET 요청 보내기
  const handleGetRequest = () => {
    setGetResponse('데이터 로딩 중...');
    // data3.jsp로 GET 요청을 보냅니다.
    axios.get('/insa/data3.jsp')
      .then((response) => {
        setGetResponse(JSON.stringify(response.data, null, 2));
      })
      .catch((error) => {
        console.error('GET 에러:', error);
        setGetResponse(`요청 실패: ${error.message}\n\n*Tomcat 서버가 구동 중인지 확인하세요.`);
      });
  };

  // 2. JSP로 POST 요청 보내기
  const handlePostRequest = (e) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim()) return;

    setPostResponse('데이터 전송 중...');

    axios.post('/insa/data3.jsp', {
      userName: userName,
      userEmail: userEmail,
      timestamp: new Date().toLocaleTimeString()
    })
    .then((response) => {
      setPostResponse(JSON.stringify(response.data, null, 2));
    })
    .catch((error) => {
      console.error('POST 에러:', error);
      setPostResponse(`요청 실패: ${error.message}`);
    });
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h2>React & JSP(MySQL) 연동 테스트</h2>
      <p style={{ color: '#666' }}>Target Path: <code>/insa/data3.jsp</code></p>
      <hr />

      <div style={{ marginBottom: '20px' }}>
        <h3>1. GET 수신 테스트</h3>
        <button onClick={handleGetRequest} style={{ padding: '8px 16px', cursor: 'pointer' }}>JSP 데이터 가져오기</button>
        <pre style={{ backgroundColor: '#282c34', color: '#fff', padding: '10px', borderRadius: '4px', marginTop: '10px', overflowX: 'auto' }}>
          {getResponse || '대기 중...'}
        </pre>
      </div>

      <div>
        <h3>2. POST 송신 테스트</h3>
        <form onSubmit={handlePostRequest}>
          <input 
            type="text" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
            placeholder="이름"
            style={{ padding: '8px', marginRight: '10px', width: '250px' }}
          />
          <input 
            type="email" 
            value={userEmail} 
            onChange={(e) => setUserEmail(e.target.value)} 
            placeholder="이메일"
            style={{ padding: '8px', marginRight: '10px', width: '250px' }}
          />
          <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>보내기</button>
        </form>
        <pre style={{ backgroundColor: '#282c34', color: '#fff', padding: '10px', borderRadius: '4px', marginTop: '10px', overflowX: 'auto' }}>
          {postResponse || '대기 중...'}
        </pre>
      </div>
    </div>
  );
}

export default App;