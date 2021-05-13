import React, {useEffect, useState} from 'react';
import * as S from './styles';
import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png';
import { Link } from 'react-router-dom';
import api from '../../services/api';


function Header({ clickNotification }) {
  const [lateCount, setLateCount] = useState([]);


  async function lateVerify(){
    await api.get(`/task/filter/late/11:11:11:11:11:11`)
    .then(response => {
      setLateCount(response.data.length)
    })
  }

  useEffect(() => {
    lateVerify();
  })

  return (
    <S.Container>
        <S.LeftSide>
            <img src={logo} alt="Logo"/>
        </S.LeftSide>
        <S.RightSide>
            <Link to="/">INÍCIO</Link>
            <span className="dividir" />
            <Link to="/task">NOVA TAREFA</Link>
            <span className="dividir" />
            <Link to="/qrcode">SINCRONIZAR CELULAR</Link>
            <span className="dividir" />
            {
              lateCount &&
              <>
                <button onClick={clickNotification} id="notification">
                  <img src={bell} alt="Notificação" />
                  <span>{lateCount}</span>
                </button>
              </>
            }
        </S.RightSide>
    </S.Container>
  );
}

export default Header;