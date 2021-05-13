import React, {useState} from 'react';
import * as S from './styles';
import  Qr from 'qrcode.react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';


function QrCode() {
    const [mac, setMac] = useState();

    async function saveMac() {
        await localStorage.setItem('@todo/macaddress', mac);
    }

    return (
        <S.Container>
            <Header />

            <S.Content>
                <h1>Capture o qrcode pelo app</h1>
                <p>Suas atividades serão sincronizadas com a do seu celular</p>
                <S.QrCodeArea>
                    <Qr value='getmacaddress' size={250} />
                </S.QrCodeArea>

                <S.ValidationCode>
                    <span>Digite a numeração que apareceu no celular</span>
                    <input type="text" onChange={e => setMac(e.target.value)} value={mac} />
                    <button onClick={saveMac} type="button" >SINCRONIZAR</button>
                </S.ValidationCode>
                
            </S.Content>

            <Footer />
        </S.Container>
    )
}

export default QrCode;